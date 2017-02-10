using System;

namespace Domain.Post_Tag
{
    public class PostTag
    {
        public Guid PostId {get; set;}
        public Guid TagId {get; set;}

        public Domain.Post.Post Post {get;set;}
        public Domain.Tag.Tag Tag {get; set;}
    }
}