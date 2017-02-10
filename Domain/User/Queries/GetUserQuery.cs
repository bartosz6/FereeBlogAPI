
namespace Domain.User.Queries
{
    public class GetUserQuery : IQuery<ApplicationUser>
    {
        public GetUserQuery(string login) {
            Login = login;
        }
        
        public string Login {get;}
    }
}