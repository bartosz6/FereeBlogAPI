using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IQueryDispatcher
    {
        Task<TResult> Dispatch<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>;
    }
}