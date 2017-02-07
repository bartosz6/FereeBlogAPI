using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IQueryHandler<TQuery, TResult> where TQuery : IQuery<TResult>
    {
        Task<TResult> Handle(TQuery query);
    }
}