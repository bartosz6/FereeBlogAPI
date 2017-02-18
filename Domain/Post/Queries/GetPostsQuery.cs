namespace Domain.Post.Queries
{
    public class GetPostsQuery : IQuery<string>
    {
        public int StartIndex { get; }
        public int Length { get; }
        public string Tag { get; }

        public GetPostsQuery(int startIndex, int length, string tag)
        {
            StartIndex = startIndex;
            Length = length;
            Tag = tag;
        }
    }
}