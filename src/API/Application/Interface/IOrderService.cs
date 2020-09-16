using Application.Dto;
using System.Collections.Generic;

namespace Application.Interface
{
    public interface IOrderService
    {
        IEnumerable<DtoOrder> ReadAllOrders();

        DtoDefaultResponse CreateOrder(DtoOrder order);

        DtoOrder ReadOrder(int orderId);

        DtoDefaultResponse UpdateOrder(DtoOrder order);

        DtoDefaultResponse DeleteOrder(int orderId);
    }
}
