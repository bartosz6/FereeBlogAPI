using System.Threading.Tasks;
using Domain;

namespace Infrastructure.Interfaces
{
    public interface IWriteRepository<TEntity> where TEntity : IBaseDomainEntity
    {
         Task Create(TEntity entity);
         Task Update(TEntity entity);
         Task Delete(TEntity entity);
    }
}