
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth.Jwt
{
    
    public class StaticKeyGen: IKeyGen
    {
        public SecurityKey Key => new SymmetricSecurityKey(
            //TODO: zaimplementowac inny
                Encoding.ASCII.GetBytes("wololololodsowejroj324")
            );
    }
}