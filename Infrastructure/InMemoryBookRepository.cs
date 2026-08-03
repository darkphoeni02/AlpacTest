namespace Infrastructure
{
    public class InMemoryBookRepository : Application.IBookRepository
    {
        
        private readonly List<Domain.Book> _books = new();

        public IEnumerable<Domain.Book> GetAll(string? genre = null, bool? available = null)
        {
            // 1. Iniciamos la consulta base con todos los libros
            var query = _books.AsEnumerable();

            // 2. Filtro de texto (Género)
            if (!string.IsNullOrWhiteSpace(genre))
            {
                query = query.Where(b => b.Genre != null &&
                                         b.Genre.Contains(genre, StringComparison.OrdinalIgnoreCase));
            }

            // 3. Filtro booleano (Disponibilidad - El Combobox)
            if (available.HasValue)
            {
                // available.Value extrae el booleano (true/false) para compararlo con la entidad
                query = query.Where(b => b.Available == available.Value);
            }

            // 4. Ejecutamos la consulta final
            return query.ToList();
        }

        public Domain.Book? GetById(string id) => _books.FirstOrDefault(b => b.Id == id);

        public void Add(Domain.Book book) => _books.Add(book);
        public void Update(Domain.Book book)
        {
            var existingBook = GetById(book.Id);
            if (existingBook != null)
            {
                _books.Remove(existingBook);
                _books.Add(book);
            }
        }
        public void Delete(string id)
        {
            var book = GetById(id);
            if (book != null)
            {
                _books.Remove(book);
            }
        }
    }
}
