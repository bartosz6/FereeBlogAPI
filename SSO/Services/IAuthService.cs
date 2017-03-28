using WebApplication.Models;

namespace Sso.Services
{
    public interface IAuthService
    {
         string GetTokenForUser(ApplicationUser user);
    }
}