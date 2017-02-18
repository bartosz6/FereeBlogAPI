namespace Web.Models.Blog
{
    public class BlogQueryModel
    {
        public int StartIndex { get; set; }
        public int Length { get; set; }
        public string Tag { get; set; }

        public BlogQueryModel()
        {
            Length = 5;
            StartIndex = 0;
            Tag = string.Empty;
        }
    }
}