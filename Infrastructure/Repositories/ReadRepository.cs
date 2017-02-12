using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ReadRepository<TEntity> : IReadRepository<TEntity> where TEntity : class, IBaseDomainEntity
    {
        private readonly DbContext _context;

        public ReadRepository(DbContext context)
        {
            _context = context;
        }

        public Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue).FirstOrDefaultAsync(predicate);
        }

        public Task<List<TEntity>> GetAll()
        {
            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue).ToListAsync();
        }

        public Task<List<TEntity>> GetMany(Expression<Func<TEntity, bool>> predicate)
        {

            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue).Where(predicate).ToListAsync();
        }
    }
}