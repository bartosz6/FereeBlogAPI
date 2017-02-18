
namespace Domain.User.Queries
{
    public class GetUserByEmailQuery : IQuery<ApplicationUser>
    {
        public GetUserByEmailQuery(string login) {
            Login = login;
        }
        
        public string Login {get;}
    }
}