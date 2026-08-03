namespace AlpacApi.Dtos
{
    public class BookRequest
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string? Genre { get; set; }
        public int Year { get; set; }
        public string? Synopsis { get; set; }
        public bool Available { get; set; }
    }
}
