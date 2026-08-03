using System;
using System.Linq;
using Domain;
using Infrastructure;
using Xunit;

namespace AlpacApi.Tests
{
    public class InMemoryBookRepositoryTests
    {
        [Fact]
        public void Add_GetById_ReturnsBook()
        {
            var repo = new InMemoryBookRepository();
            var book = new Book("T1","A1", DateTime.Now.Year);
            repo.Add(book);

            var fetched = repo.GetById(book.Id);
            Assert.NotNull(fetched);
            Assert.Equal(book.Id, fetched.Id);
        }

        [Fact]
        public void GetAll_FilterByGenre_ReturnsFiltered()
        {
            var repo = new InMemoryBookRepository();
            var b1 = new Book("T1","A1", DateTime.Now.Year) { Genre = "Sci-Fi" };
            var b2 = new Book("T2","A2", DateTime.Now.Year) { Genre = "Romance" };
            repo.Add(b1);
            repo.Add(b2);

            var results = repo.GetAll("Sci-Fi", null).ToList();
            Assert.Single(results);
            Assert.Equal("Sci-Fi", results[0].Genre);
        }

        [Fact]
        public void GetAll_FilterByAvailable_ReturnsFiltered()
        {
            var repo = new InMemoryBookRepository();
            var b1 = new Book("T1","A1", DateTime.Now.Year) { Available = true };
            var b2 = new Book("T2","A2", DateTime.Now.Year) { Available = false };
            repo.Add(b1);
            repo.Add(b2);

            var available = repo.GetAll(null, true).ToList();
            Assert.Single(available);
            Assert.True(available[0].Available);
        }

        [Fact]
        public void Update_ReplacesExisting()
        {
            var repo = new InMemoryBookRepository();
            var book = new Book("T1","A1", DateTime.Now.Year);
            repo.Add(book);

            var updated = new Book("T1 Updated","A1", DateTime.Now.Year) { Id = book.Id };
            repo.Update(updated);

            var fetched = repo.GetById(book.Id);
            Assert.Equal("T1 Updated", fetched.Title);
        }

        [Fact]
        public void Delete_RemovesBook()
        {
            var repo = new InMemoryBookRepository();
            var book = new Book("T1","A1", DateTime.Now.Year);
            repo.Add(book);

            repo.Delete(book.Id);
            var fetched = repo.GetById(book.Id);
            Assert.Null(fetched);
        }
    }
}
