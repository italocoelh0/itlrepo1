using DAL.Models;
using System;

namespace DAL.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        IRepository<OrderProduct> OrderProductRepo { get; }
        IRepository<Order> OrderRepo { get; }
        IRepository<Product> ProductRepo { get; }
    }
}
