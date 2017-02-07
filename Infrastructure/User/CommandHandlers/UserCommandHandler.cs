using Infrastructure.Interfaces;
using Infrastructure.User.Commands;
using Microsoft.AspNetCore.Identity;
using Domain.User;
using System;
using System.Threading.Tasks;

namespace Infrastructure.User.CommandHandlers
{
    public class UserCommandHandler : ICommandHandler<LoginCommand>
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserCommandHandler(SignInManager<ApplicationUser> signInManager) {
            _signInManager = signInManager;
        }

        public async Task Handle(LoginCommand command)
        {
            var result = await _signInManager
                .PasswordSignInAsync(command.Login, command.Password, true, false);

            if (!result.Succeeded)
                throw new UnauthorizedAccessException();
        }
    }
}