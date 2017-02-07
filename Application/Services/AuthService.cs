using System;
using System.Threading.Tasks;
using Application.Services.Interfaces;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        public Task<string> GetToken(string login, string password)
        {
            throw new NotImplementedException();
        }

        public Task<string> RefreshToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}