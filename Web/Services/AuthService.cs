using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Domain.User;
using Web.Jwt;

namespace Web.Services
{
    public class AuthService : IAuthService
    {
        private readonly TokenAuthOptions _tokenAuthOptions;

        public AuthService(TokenAuthOptions tokenAuthOptions) {
            _tokenAuthOptions = tokenAuthOptions;
        }
        
        public string GetTokenForUser(ApplicationUser user)
        {
            var handler = new JwtSecurityTokenHandler();
            var identity = new ClaimsIdentity(
                new[] {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Sid, user.Id)
                }
            );

            var securityToken = handler.CreateToken(new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor()
            {
                Issuer = _tokenAuthOptions.Issuer,
                Audience = _tokenAuthOptions.Audience,
                SigningCredentials = _tokenAuthOptions.SigningCredentials,
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(5)
            });
            
            return handler.WriteToken(securityToken);
        }
    }
}