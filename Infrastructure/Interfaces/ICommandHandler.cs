using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICommandHandler<TCommand> where TCommand: ICommand
    {
        Task Handle(TCommand command);
    }
}