using Domain.User;

namespace Domain.Comment
{
    public class Comment : BaseDomainEntity
    {
        public Domain.Post.Post Post {get; set;}
        public ApplicationUser Author { get; set; }
        public string Content { get; set; }
    }
}