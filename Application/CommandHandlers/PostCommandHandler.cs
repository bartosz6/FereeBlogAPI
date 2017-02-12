using System;
using System.Threading.Tasks;
using Domain.Post;
using Domain.Post.Commands;
using Domain.User;
using Infrastructure.Interfaces;

namespace Application.CommandHandlers
{
    public class PostCommandHandler : ICommandHandler<CreatePostCommand>
    {
        private readonly IWriteRepository<Post> _postWriteRepository;
        public PostCommandHandler(
            IWriteRepository<Post> postWriteRepository
            )
        {
            _postWriteRepository = postWriteRepository;
        }

        public Task Handle(CreatePostCommand command)
        {
            var author = new ApplicationUser { Id = command.AuthorId.ToString() };
            var post = new Post(command.Content, author, command.BannerImageUrl);

            return _postWriteRepository.Create(post);
        }
    }
}