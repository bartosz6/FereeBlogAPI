using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.User;
using Domain.User.AccountViewModels;
using Infrastructure.Interfaces;
using Infrastructure.User.Commands;
using Infrastructure.User.Queries;
using Web.Services;

namespace WebApplication.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly IAuthService _authService;

        public AccountController(
            ICommandDispatcher commandDispatcher,
            IQueryDispatcher queryDispatcher,
            IAuthService authService)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
            _authService = authService;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("/api/login")]
        public async Task<object> Login([FromBody] LoginViewModel model)
        {
            await _commandDispatcher.Dispatch(new LoginCommand(model.Email, model.Password));

            var user = await _queryDispatcher.Dispatch<GetUserQuery, ApplicationUser>(new GetUserQuery(model.Email));

            var newToken = _authService.GetTokenForUser(user);

            return newToken;
        }
}
