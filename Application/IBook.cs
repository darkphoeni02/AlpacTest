using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetAll();

        Book? GetById(string id);

        void Add(Book book);

        void Update(Book book);

        void Delete(string id);
    }
}
