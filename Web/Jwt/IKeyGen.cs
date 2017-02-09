using Microsoft.IdentityModel.Tokens;

namespace Web.Jwt
{
    public interface IKeyGen
    {
         SecurityKey Key {get;}
    }
}