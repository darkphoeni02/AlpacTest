using Application;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class Book : IBook
    {
        public BookEntity GetBook()
        {
            throw new NotImplementedException();
        }

        public BookEntity GetBookEntity(int id)
        {
            throw new NotImplementedException();
        }
    }
}
