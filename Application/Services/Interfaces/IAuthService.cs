using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface IAuthService
    {
         Task<string> GetToken(string login, string password);
         Task<string> RefreshToken(string token);
    }
}