using System.Collections.Generic;
using Domain.User;

namespace Domain.Post
{
    public class Post : BaseDomainEntity
    {
        public string Content { get; set; }
        public ApplicationUser Author { get; set; }
        public string BannerImageUrl { get; set; }

        public IEnumerable<Domain.Post_Tag.PostTag> PostTags {get; set;}
        public IEnumerable<Domain.Comment.Comment> Comments { get; set; }
    }
}