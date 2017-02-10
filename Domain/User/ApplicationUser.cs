using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Domain.User
{
    public class ApplicationUser : IdentityUser
    {
        public IEnumerable<Domain.Post.Post> Posts {get; set;}

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
