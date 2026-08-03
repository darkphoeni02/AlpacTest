using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application
{
    public interface IBook
    {
        BookEntity GetBook();

        BookEntity GetBookEntity(int id);

    }
}
