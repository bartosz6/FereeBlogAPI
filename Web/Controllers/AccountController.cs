using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.User;
using Domain.User.AccountViewModels;
using Infrastructure.Interfaces;
using Web.Services;
using Domain.User.Commands;
using Domain.User.Queries;
using Microsoft.AspNetCore.Http.Internal;
using Web.Controllers;

namespace WebApplication.Controllers
{
    public class AccountController : BaseController
    {
        public IAuthService AuthService {get; set;}

        [HttpPost]
        [AllowAnonymous]
        [Route("/api/user/login")]
        public async Task<object> Login([FromBody] LoginViewModel model)
        {
            await CommandDispatcher.Dispatch(new LoginCommand(model.Email, model.Password));

            var user = await QueryDispatcher.Dispatch<GetUserByEmailQuery, ApplicationUser>(new GetUserByEmailQuery(model.Email));

            var newToken = AuthService.GetTokenForUser(user);

            return newToken;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("/api/user/register")]
        public async Task<object> Register([FromBody] LoginViewModel model)
        {
            await CommandDispatcher.Dispatch(new RegisterUserCommand(model.Email, model.Password, model.Email));

            var user = await QueryDispatcher.Dispatch<GetUserByEmailQuery, ApplicationUser>(new GetUserByEmailQuery(model.Email));

            var newToken = AuthService.GetTokenForUser(user);

            return newToken;
        }
    }
}
