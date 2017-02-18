using System.Net;
using System.Threading.Tasks;
using Domain.Post.Commands;
using Domain.Post.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Blog;

namespace Web.Controllers
{
    public class BlogController : BaseController
    {
        [HttpPost]
        [Route("/api/blog/add")]
        public async Task<object> Add([FromBody] AddModel model)
        {
            if (ModelState.IsValid)
            {
                var id = CurrentUserId;

                await CommandDispatcher.Dispatch(new CreatePostCommand(model.Content, id.Value, null));

                return HttpStatusCode.OK;
            }

            return ModelState.ToString();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("/api/blog/query")]
        public async Task<object> GetAsync(BlogQueryModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await QueryDispatcher.Dispatch<GetPostsQuery, string>(
                    new GetPostsQuery(
                        model.StartIndex,
                        model.Length,
                        model.Tag
                    ));

                return result;
            }

            return HttpStatusCode.InternalServerError;
        }
    }
}