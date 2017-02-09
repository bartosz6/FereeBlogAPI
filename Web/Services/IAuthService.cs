using Domain.User;

namespace Web.Services
{
    public interface IAuthService
    {
         string GetTokenForUser(ApplicationUser user);
    }
}