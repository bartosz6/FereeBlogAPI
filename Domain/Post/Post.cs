using System;
using Domain.User;

namespace Domain.Post
{
    public class Post : BaseDomainEntity
    {
        public string Content {get; set;}
        public ApplicationUser Author {get; set;}
        public string BannerImageUrl {get; set;}
    }
}