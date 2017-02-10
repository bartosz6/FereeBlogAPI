

namespace Domain.User.Commands
{
    public class LoginCommand : ICommand
    {
        public LoginCommand(string login, string password) {
            Login = login;
            Password = password;
        }
        
        public string Login { get; }
        public string Password { get; }
    }
}