
namespace Domain.User.Commands
{
    public class RegisterUserCommand: ICommand
    {
        public string Login {get;}
        public string Password {get;}
        public string Email {get;}

        public RegisterUserCommand(
            string login, 
            string password,
            string email
            ) 
        {
            Login = login;
            Password = password;
            Email = email;
        }
    }
}