namespace Infrastructure
{
    public class InMemoryBookRepository : Application.IBookRepository
    {
        
        private readonly List<Domain.Book> _books = new();

        public IEnumerable<Domain.Book> GetAll() => _books;

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
