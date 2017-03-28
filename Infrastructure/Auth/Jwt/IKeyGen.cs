using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth.Jwt
{
    public interface IKeyGen
    {
         SecurityKey Key {get;}
    }
}