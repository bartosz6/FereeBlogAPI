using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Post;
using Domain.Post.Queries;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.QueryHandlers
{
    public class PostQueryHandler
        :
        IQueryHandler<GetPostsQuery, string>
    {
        private readonly IRepository<Post> _postRepository;

        public PostQueryHandler(IRepository<Post> postRepository)
        {
            _postRepository = postRepository;
        }

        public Task<string> Handle(GetPostsQuery query)
        {
            var result = _postRepository.Find(
                post =>
                    string.IsNullOrWhiteSpace(query.Tag) || post.Tags.Any(tag => tag.Name == query.Tag)
            )
            .Include(a => a.Author)
            .Include(a => a.Tags)
            .OrderByDescending(a => a.Created)
            .Skip(query.StartIndex)
            .Take(query.Length)
            .Select(r => new
            {
                date = r.Created,
                author = new {
                    name = r.Author.UserName
                },
                imageUrl = r.BannerImageUrl,
                tags = r.Tags.Select(t => t.Name),
                title = r.Content.Substring(0, 25) + "..."
            })
            .ToList();

            // TODO: wczytywac gotowe struktury z read modelu

            return Task.Factory.StartNew(
                () => JsonConvert.SerializeObject(result, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }));
        }
    }
}