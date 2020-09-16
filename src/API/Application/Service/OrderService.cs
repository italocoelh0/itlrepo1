using Application.Dto;
using Application.Interface;
using DAL.Models;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Service
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<DtoOrder> ReadAllOrders()
        {
            try
            {
                var order = _unitOfWork.OrderRepo.Read().ToList();

                List<DtoOrder> response = new List<DtoOrder>();

                foreach (Order item in order)
                {
                    DtoOrder newItem = new DtoOrder
                    {
                        OrderId = item.OrderId,
                        OrderValidity = item.OrderValidity,
                        OrderDiscount = item.OrderDiscount,
                        OrderValue = item.OrderValue
                    };

                    var products = _unitOfWork.OrderProductRepo.Read(w => w.OrderId == item.OrderId, j => j.Product).ToList();

                    List<DtoProduct> productsList = new List<DtoProduct>();
                    foreach (var product in products)
                    {
                        productsList.Add(new DtoProduct { ProductId = product.ProductId, ProductName = product.Product.ProductName, ProductValue = product.Product.ProductValue });
                    }

                    newItem.Products = productsList;

                    response.Add(newItem);
                }
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoDefaultResponse CreateOrder(DtoOrder order)
        {
            try
            {
                Order newOrder = new Order
                {
                    OrderValidity = order.OrderValidity,
                    OrderDiscount = order.OrderDiscount,
                    OrderValue = order.OrderValue
                };
                _unitOfWork.OrderRepo.Create(newOrder);
                _unitOfWork.Commit();

                foreach (DtoProduct product in order.Products)
                {
                    OrderProduct newOrderProduct = new OrderProduct
                    {
                        OrderId = newOrder.OrderId,
                        ProductId = product.ProductId
                    };
                    _unitOfWork.OrderProductRepo.Create(newOrderProduct);
                    _unitOfWork.Commit();
                }

                return new DtoDefaultResponse { ResponseCode = 201, ResponseMessage = $"O pedido {newOrder.OrderId} foi criado com sucesso." };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoOrder ReadOrder(int orderId)
        {
            try
            {
                var order = _unitOfWork.OrderRepo.Read(w => w.OrderId == orderId).FirstOrDefault();

                if (order != null)
                {
                    DtoOrder dtoOrder = new DtoOrder
                    {
                        OrderId = order.OrderId,
                        OrderValidity = order.OrderValidity,
                        OrderDiscount = order.OrderDiscount,
                        OrderValue = order.OrderValue
                    };

                    var products = _unitOfWork.OrderProductRepo.Read(w => w.OrderId == order.OrderId, j => j.Product).ToList();

                    List<DtoProduct> productsList = new List<DtoProduct>();
                    foreach (var product in products)
                    {
                        productsList.Add(new DtoProduct { ProductId = product.ProductId, ProductName = product.Product.ProductName, ProductValue = product.Product.ProductValue });
                    }

                    dtoOrder.Products = productsList;

                    return dtoOrder;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DtoDefaultResponse UpdateOrder(DtoOrder dtoOrder)
        {
            try
            {
                var order = _unitOfWork.OrderRepo.Read(w => w.OrderId == dtoOrder.OrderId).FirstOrDefault();

                if (order != null)
                {
                    order.OrderDiscount = dtoOrder.OrderDiscount;
                    order.OrderValue = dtoOrder.OrderValue;

                    _unitOfWork.OrderRepo.Update(order);
                    _unitOfWork.Commit();

                    var orderProducts = _unitOfWork.OrderProductRepo.Read(w => w.OrderId == order.OrderId).ToList();

                    List<int> orderProductsIds = new List<int>();

                    foreach (var product in dtoOrder.Products)
                    {
                        orderProductsIds.Add(product.ProductId);

                        if (orderProducts.Where(w => w.ProductId == product.ProductId).Count() == 0)
                        {
                            OrderProduct newOrderProduct = new OrderProduct
                            {
                                OrderId = (int)order.OrderId,
                                ProductId = product.ProductId
                            };

                            _unitOfWork.OrderProductRepo.Create(newOrderProduct);
                            _unitOfWork.Commit();
                        }
                    }

                    foreach (var orderProduct in orderProducts)
                    {
                        if (!orderProductsIds.Contains(orderProduct.ProductId))
                        {
                            _unitOfWork.OrderProductRepo.Delete(orderProduct);
                            _unitOfWork.Commit();
                        }
                    }

                    return new DtoDefaultResponse { ResponseCode = 200, ResponseMessage = $"O pedido {order.OrderId} foi atualizado com sucesso." };
                }
                else
                {
                    return new DtoDefaultResponse { ResponseCode = 204, ResponseMessage = $"O pedido {order.OrderId} não foi encontrado." };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoDefaultResponse DeleteOrder(int orderId)
        {
            try
            {
                var order = _unitOfWork.OrderRepo.Read(w => w.OrderId == orderId).FirstOrDefault();

                if (order != null)
                {
                    var orderProducts = _unitOfWork.OrderProductRepo.Read(w => w.OrderId == orderId).ToList();

                    foreach (var orderProduct in orderProducts)
                    {
                        _unitOfWork.OrderProductRepo.Delete(orderProduct);
                        _unitOfWork.Commit();
                    }

                    _unitOfWork.OrderRepo.Delete(order);
                    _unitOfWork.Commit();

                    return new DtoDefaultResponse { ResponseCode = 200, ResponseMessage = $"O pedido {orderId} foi excluído com sucesso." };
                }
                else
                {
                    return new DtoDefaultResponse { ResponseCode = 204, ResponseMessage = $"O pedido {orderId} não foi encontrado." };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
