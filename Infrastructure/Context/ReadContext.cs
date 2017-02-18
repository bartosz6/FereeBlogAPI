using Microsoft.EntityFrameworkCore;
using Domain.Post;
using Domain.Tag;
using Domain.Comment;

namespace Infrastructure.Context
{
    public class ReadModel<T> {

    }
    public class ReadContext : DbContext
    {
        public DbSet<ReadModel<Comment>> ReadComments {get; set;}

        public ReadContext(DbContextOptions<ReadContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
