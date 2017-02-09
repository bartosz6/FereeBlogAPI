using System.Threading.Tasks;
using Domain.User;
using Infrastructure.Interfaces;
using Infrastructure.User.Queries;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.User.QueryHandlers
{
    public class UserQueryHandler : IQueryHandler<GetUserQuery, ApplicationUser>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        
        public UserQueryHandler(UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        public async Task<ApplicationUser> Handle(GetUserQuery query)
        {
            var user = await _userManager.FindByEmailAsync(query.Login);
            return user;
        }
    }
}