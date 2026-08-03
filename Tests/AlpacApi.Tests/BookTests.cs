using System;
using Domain;
using Xunit;

namespace AlpacApi.Tests
{
    public class BookTests
    {
        [Fact]
        public void Constructor_ValidData_CreatesBook()
        {
            var title = "Test Title";
            var author = "Author";
            var year = DateTime.Now.Year;

            var book = new Book(title, author, year);

            Assert.NotNull(book.Id);
            Assert.Equal(title, book.Title);
            Assert.Equal(author, book.Author);
            Assert.Equal(year, book.Year);
            Assert.True(book.Available);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_InvalidTitle_Throws(string badTitle)
        {
            var author = "Author";
            var year = DateTime.Now.Year;

            Assert.Throws<ArgumentException>(() => new Book(badTitle, author, year));
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_InvalidAuthor_Throws(string badAuthor)
        {
            var title = "Title";
            var year = DateTime.Now.Year;

            Assert.Throws<ArgumentException>(() => new Book(title, badAuthor, year));
        }

        [Fact]
        public void Constructor_InvalidYear_Throws()
        {
            var title = "Title";
            var author = "Author";
            var tooOld = 1400;
            var tooNew = DateTime.Now.Year + 5;

            Assert.Throws<ArgumentException>(() => new Book(title, author, tooOld));
            Assert.Throws<ArgumentException>(() => new Book(title, author, tooNew));
        }
    }
}
