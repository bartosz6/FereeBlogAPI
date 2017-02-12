using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain;

namespace Infrastructure.Interfaces
{
    public interface IReadRepository<TEntity> where TEntity : IBaseDomainEntity
    {
         Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate);
         Task<List<TEntity>> GetMany(Expression<Func<TEntity, bool>> predicate);
         Task<List<TEntity>> GetAll();
    }
}