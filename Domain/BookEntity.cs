using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Book
    {
        public string Id { get; set; } = Random.Shared.Next(1, 1000000).ToString();
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; } = "General";
        public int Year { get; set; }
        public string? Synopsis { get; set; }
        public bool Available { get; set; } = true;

        public Book(string title, string author, int year)
        {
            // Validar campos obligatorios
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("El título es obligatorio.");

            if (string.IsNullOrWhiteSpace(author))
                throw new ArgumentException("El autor es obligatorio.");

            // Validar la regla del año (entre 1450 y año actual + 1)
            int limite = DateTime.Now.Year + 1;
            if (year < 1450 || year > limite)
            {
                throw new ArgumentException($"El año de publicación debe estar entre 1450 y {limite}.");
            }

            // Si pasa todas las validaciones, construimos el objeto
            Id = Random.Shared.Next(1, 1000000).ToString();
            Title = title;
            Author = author;
            Year = year;
        }
    }

}
