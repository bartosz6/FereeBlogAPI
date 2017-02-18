using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Domain.User
{
    public class ApplicationUser : IdentityUser, IBaseDomainEntity
    {
        public IEnumerable<Domain.Post.Post> Posts {get; set;}
        public IEnumerable<Domain.Comment.Comment> Comments {get; set;}
        public string AvatarUrl {get; set;}
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public ApplicationUser() {}

        public ApplicationUser(
            string login,
            string email
        ) 
        {
            this.UserName = login;
            this.Email = email;
        }
    }
}
