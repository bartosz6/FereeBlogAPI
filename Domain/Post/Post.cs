using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Domain.User;

namespace Domain.Post
{
    public class Post : IBaseDomainEntity
    {
        public string Content { get; set; }
        public ApplicationUser Author { get; set; }
        public string BannerImageUrl { get; set; }

        public ICollection<Domain.Tag.Tag> Tags { get; set; }
        public ICollection<Domain.Comment.Comment> Comments { get; set; }
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Deleted { get; set; }

        public Post() : base()
        {
        }

        public Post(
            string content,
            ApplicationUser author,
            string bannerImageUrl)
            : this()
        {
            Content = content;
            Author = author;
            BannerImageUrl = bannerImageUrl;
            Tags = GetTags().ToList();
        }

        public IEnumerable<Domain.Tag.Tag> GetTags()
        {
            var regex = new Regex(@"(?<=#)\w+");
            var matches = regex.Matches(Content)
                .Cast<Match>()
                .Select(m => m.Value)
                .Distinct()
                .Select(t => new Domain.Tag.Tag(t));

            return matches;
        }
    }
}