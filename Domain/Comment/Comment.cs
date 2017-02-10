using System.Collections.Generic;
using System.Linq;
using Domain.User;

namespace Domain.Comment
{
    public class Comment : BaseDomainEntity
    {
        public Domain.Post.Post Post {get; set;}
        public ApplicationUser Author { get; set; }
        public string Content { get; set; }
        public Comment Parent {get; set;}
        public IEnumerable<Comment> Childrens {get; set;}

        public Comment()
        {
            Childrens = new List<Comment>();
        }

        public Comment(Domain.Post.Post post, ApplicationUser author, string content, Comment parent = null): this()
        {
            Post = post;
            Author = author;
            Content = content;
            Parent = parent;
        }

        void AddChildrenComment(Comment children) {
            children.Parent = this;
            var newChildrens = Childrens.ToList();
            newChildrens.Add(children);
            Childrens = newChildrens;
        }
    }
}