using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using Domain.User;
using System;
using System.Threading.Tasks;
using Domain.User.Commands;

namespace Application.CommandHandlers
{
    public class UserCommandHandler : 
        ICommandHandler<LoginCommand>,
        ICommandHandler<RegisterUserCommand>
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserCommandHandler(SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager) {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task Handle(RegisterUserCommand command)
        {
            var user = new ApplicationUser(
                command.Login,
                command.Email
            );

            user.EmailConfirmed = true;
            var result = await _userManager.CreateAsync(user, command.Password);

            if(!result.Succeeded)
                throw new InvalidOperationException($"Failed to register user {command.Login}");
        }

        public async Task Handle(LoginCommand command)
        {
            var result = await _signInManager
                .PasswordSignInAsync(command.Login, command.Password, true, false);

            if (!result.Succeeded)
                throw new UnauthorizedAccessException($"Login error for user {command.Login}");
        }
    }
}