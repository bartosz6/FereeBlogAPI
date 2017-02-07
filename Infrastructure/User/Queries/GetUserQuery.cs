using Domain.User;
using Infrastructure.Interfaces;

namespace Infrastructure.User.Queries
{
    public class GetUserQuery : IQuery<ApplicationUser>
    {
        public GetUserQuery(string login) {
            Login = login;
        }
        
        public string Login {get;}
    }
}