using System;
using System.Threading.Tasks;
using Domain.Post;
using Domain.Post.Commands;
using Domain.Tag;
using Domain.User;
using Infrastructure.Interfaces;

namespace Application.CommandHandlers
{
    public class PostCommandHandler : ICommandHandler<CreatePostCommand>
    {
        private readonly IRepository<Post> _postRepository;
        private readonly IRepository<Tag> _tagRepository;

        public PostCommandHandler(
            IRepository<Post> postRepository,
            IRepository<Tag> tagRepository
            )
        {
            _postRepository = postRepository;
            _tagRepository = tagRepository;
        }

        public Task Handle(CreatePostCommand command)
        {
            var author = new ApplicationUser { Id = command.AuthorId.ToString() };
            var post = new Post(command.Content, author, command.BannerImageUrl);
            
            _postRepository.Attach(author);
            return _postRepository.Create(post);
        }
    }
}