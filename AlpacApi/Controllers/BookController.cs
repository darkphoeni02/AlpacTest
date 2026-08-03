using Domain;
using Application;
using Microsoft.AspNetCore.Mvc;
using AlpacApi.Dtos;

namespace AlpacApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repository;

        public BookController(IBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Book>> Get()
        {
            var books = _repository.GetAll();
            return Ok(books); // Retorna 200 OK
        }

        [HttpGet("{id}")]
        public ActionResult<Book> Get(string id)
        {
            var book = _repository.GetById(id);
            if (book == null)
            {
                return NotFound(new { error = "Libro no encontrado" }); // Retorna 404
            }
            return Ok(book); // Retorna 200 OK
        }

        [HttpPost]
        public ActionResult Post([FromBody] BookRequest request)
        {
            try
            {
                // 1. Intentamos crear el libro. Si el año es inválido, lanzará la excepción.
                var book = new Book(request.Title, request.Author, request.Year)
                {
                    // Propiedades opcionales se pueden asignar después
                    Genre = string.IsNullOrWhiteSpace(request.Genre) ? "General" : request.Genre,
                    Synopsis = request.Synopsis,
                    Available = request.Available
                };

                // 2. Si no hay error, lo guardamos
                _repository.Add(book);

                // 3. Retornamos 201 Created
                return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
            }
            catch (ArgumentException ex)
            {
                // 4. Atrapamos la regla de negocio rota y devolvemos 400 Bad Request
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Book book)
        {
            if (id != book.Id)
            {
                return BadRequest(new { error = "ID del libro no coincide" }); // Retorna 400
            }

            _repository.Update(book);
            return NoContent(); // Retorna 204 No Content
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id) {
            _repository.Delete(id);
            return NoContent(); // Retorna 204 No Content
        }

    }
}