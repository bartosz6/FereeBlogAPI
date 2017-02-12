using System;

namespace Domain.Post.Commands
{
    public class CreatePostCommand : ICommand
    {
        public string Content {get;}
        public Guid AuthorId {get;}
        public string BannerImageUrl {get;}

        public CreatePostCommand(string content, Guid authorId, string bannerImageUrl)
        {
            Content = content;
            AuthorId = authorId;
            BannerImageUrl = bannerImageUrl;
        }
    }
}