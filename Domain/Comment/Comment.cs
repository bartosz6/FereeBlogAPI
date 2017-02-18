using System;
using System.Collections.Generic;
using System.Linq;
using Domain.User;

namespace Domain.Comment
{
    public class Comment : IBaseDomainEntity
    {
        public Domain.Post.Post Post {get; set;}
        public ApplicationUser Author { get; set; }
        public string Content { get; set; }
        public Comment Parent {get; set;}
        public IEnumerable<Comment> Childrens {get; set;}
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public Comment() : base()
        {
            Childrens = new List<Comment>();
        }

        public Comment(Domain.Post.Post post, ApplicationUser author, string content, Comment parent = null): this()
        {
            Post = post;
            Author = author;
            Content = content;
            Parent = parent;

            parent.AddChildrenComment(this);
        }

        public void AddChildrenComment(Comment children) {
            if(Childrens.Contains(children))
                throw new InvalidOperationException("Duplicated comment");

            if(children.Equals(this))
                throw new InvalidOperationException("Looped comment");

            children.Parent = this;
            var newChildrens = Childrens.ToList();
            newChildrens.Add(children);
            Childrens = newChildrens;
        }
    }
}