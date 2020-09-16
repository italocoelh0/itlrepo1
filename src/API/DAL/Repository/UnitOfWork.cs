using DAL.Models;
using System;

namespace DAL.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private AppContext _appContext = null;
        private Repository<OrderProduct> orderProductRepo = null;
        private Repository<Order> orderRepo = null;
        private Repository<Product> productRepo = null;

        public UnitOfWork(AppContext context)
        {
            _appContext = context;
        }

        public IRepository<OrderProduct> OrderProductRepo
        {
            get
            {
                if (orderProductRepo == null)
                {
                    orderProductRepo = new Repository<OrderProduct>(_appContext);
                }
                return orderProductRepo;
            }
        }

        public IRepository<Order> OrderRepo
        {
            get
            {
                if (orderRepo == null)
                {
                    orderRepo = new Repository<Order>(_appContext);
                }
                return orderRepo;
            }
        }

        public IRepository<Product> ProductRepo
        {
            get
            {
                if (productRepo == null)
                {
                    productRepo = new Repository<Product>(_appContext);
                }
                return productRepo;
            }
        }

        public void Commit()
        {
            _appContext.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _appContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
