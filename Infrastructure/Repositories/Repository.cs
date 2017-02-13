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
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IBaseDomainEntity
    {
        private readonly DbContext _context;

        public Repository(DbContext context)
        {
            _context = context;
        }

        public Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue).FirstOrDefaultAsync(predicate);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue);
        }

        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {

            return _context.Set<TEntity>().Where(e => !e.Deleted.HasValue).Where(predicate);
        }

        public Task Create(TEntity entity)
        {
            entity.Created = DateTime.UtcNow;
            var task = new Task(() =>
            {
                _context.Add(entity); _context.SaveChanges();
            });
            task.Start();
            return task;
        }

        public Task CreateMany(IEnumerable<TEntity> entities) {
            var listed= entities.ToList();
            listed.ForEach(entity =>  entity.Created = DateTime.UtcNow);
            var task = new Task(() =>
            {
                _context.AddRange(listed); _context.SaveChanges();
            });
            task.Start();
            return task;
        }

        public Task Delete(TEntity entity)
        {
            entity.Deleted = DateTime.UtcNow;
            var task = new Task(() => _context.Update(entity));
            task.Start();
            return task;
        }

        public Task Update(TEntity entity)
        {
            entity.Modified = DateTime.UtcNow;
            var task = new Task(() => _context.Update(entity));
            task.Start();
            return task;
        }

        public void SetAsModified<TType>(TType entity) where TType : class, IBaseDomainEntity {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Attach<TType>(TType entity) where TType : class, IBaseDomainEntity {
            _context.Attach(entity);
        }
    }
}