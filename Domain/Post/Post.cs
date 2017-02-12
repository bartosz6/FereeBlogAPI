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

        public IEnumerable<Domain.Post_Tag.PostTag> PostTags { get; set; }
        public IEnumerable<Domain.Comment.Comment> Comments { get; set; }
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

            var postTags = new List<Domain.Post_Tag.PostTag>();
            var tags = GetTags(content);
            if (tags != null)
            {
                foreach (var tag in tags)
                {
                    postTags.Add(
                        new Domain.Post_Tag.PostTag
                        {
                            Post = this,
                            Tag = tag
                        }
                    );
                }
            }
            PostTags = postTags;
        }

        public IEnumerable<Domain.Tag.Tag> GetTags(string content)
        {
            var regex = new Regex(@"(?<=#)\w+");
            var matches = regex.Matches(content)
                .Cast<Match>()
                .Select(m => m.Value)
                .Distinct()
                .Select(t => new Domain.Tag.Tag(t));

            return matches;
        }
    }
}