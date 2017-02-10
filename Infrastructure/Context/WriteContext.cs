using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.User;
using Domain.Post;
using Domain.Tag;
using Domain.Comment;
using Domain.Post_Tag;

namespace Infrastructure.Context
{
    public class WriteContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<PostTag> Post_Tag { get; set; }

        public WriteContext(DbContextOptions<WriteContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PostTag>().HasKey(posttag => new { PostId = posttag.PostId, TagId = posttag.TagId });

            base.OnModelCreating(builder);
        }
    }
}
