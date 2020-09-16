using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace DAL.Repository
{
    public interface IRepository<T> where T : class
    {
        void Create(T entity);

        IEnumerable<T> Read(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes);

        void Update(T entity);

        void Delete(T entity);
    }
}
