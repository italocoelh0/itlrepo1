using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private AppContext _appContext = null;
        DbSet<T> _appDbSet;

        public Repository(AppContext context)
        {
            _appContext = context;
            _appDbSet = _appContext.Set<T>();
        }

        public void Create(T entity)
        {
            _appDbSet.Add(entity);
        }

        public IEnumerable<T> Read(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
        {
            includes.ToList().ForEach(x => _appDbSet.Include(x).Load());

            var _appSet = filter != null ? _appDbSet.Where(filter) : _appDbSet.AsEnumerable();

            return _appSet;
        }

        public void Update(T entity)
        {
            _appDbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            _appDbSet.Remove(entity);
        }
    }
}
