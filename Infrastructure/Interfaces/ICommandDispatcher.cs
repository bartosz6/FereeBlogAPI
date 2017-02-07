using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICommandDispatcher
    {
        Task Dispatch<TCommand>(TCommand command) where TCommand : ICommand;
    }
}