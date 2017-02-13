using System.Net;
using System.Threading.Tasks;
using Domain.Post.Commands;
using Domain.User;
using Domain.User.Queries;
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

        [HttpGet]
        [Route("/api/blog/query")]
        public object Get(BlogQueryModel model)
        {
            return model;
        }
    }
}