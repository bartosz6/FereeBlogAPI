using System;
using System.Threading.Tasks;
using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class WriteRepository<TEntity> : IWriteRepository<TEntity> where TEntity : class, IBaseDomainEntity
    {
        private readonly DbContext _context;

        public WriteRepository(DbContext context)
        {
            _context = context;
        }

        public Task Create(TEntity entity)
        {
            entity.Created = DateTime.UtcNow;
            var task = new Task(() =>
            {
                _context.Add(entity);
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
    }
}