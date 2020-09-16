using Application.Dto;
using Application.Interface;
using DAL.Models;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Service
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<DtoProduct> ReadAllProducts()
        {
            try
            {
                return _unitOfWork.ProductRepo.Read().Select(s => new DtoProduct { ProductId = s.ProductId, ProductName = s.ProductName, ProductValue = s.ProductValue }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoDefaultResponse CreateProduct(DtoProduct product)
        {
            try
            {
                Product newProduct = new Product
                {
                    ProductName = product.ProductName,
                    ProductValue = product.ProductValue
                };

                _unitOfWork.ProductRepo.Create(newProduct);
                _unitOfWork.Commit();

                return new DtoDefaultResponse { ResponseCode = 201, ResponseMessage = $"O produto {newProduct.ProductId} foi criado com sucesso." };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoProduct ReadProduct(int productId)
        {
            try
            {
                return _unitOfWork.ProductRepo.Read(w => w.ProductId == productId).Select(s => new DtoProduct { ProductId = s.ProductId, ProductName = s.ProductName, ProductValue = s.ProductValue }).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoDefaultResponse UpdateProduct(DtoProduct product)
        {
            try
            {
                var res = _unitOfWork.ProductRepo.Read(w => w.ProductId == product.ProductId).FirstOrDefault();

                if (res != null)
                {
                    res.ProductName = product.ProductName;
                    res.ProductValue = product.ProductValue;

                    _unitOfWork.ProductRepo.Update(res);
                    _unitOfWork.Commit();

                    return new DtoDefaultResponse { ResponseCode = 200, ResponseMessage = $"O pedido {product.ProductId} foi atualizado com sucesso." };
                }
                else
                {
                    return new DtoDefaultResponse { ResponseCode = 204, ResponseMessage = $"O pedido {product.ProductId} não foi encontrado." };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DtoDefaultResponse DeleteProduct(int productId)
        {
            try
            {
                var res = _unitOfWork.ProductRepo.Read(w => w.ProductId == productId).FirstOrDefault();

                if (res != null)
                {
                    _unitOfWork.ProductRepo.Delete(res);
                    _unitOfWork.Commit();

                    return new DtoDefaultResponse { ResponseCode = 200, ResponseMessage = $"O produto {productId} foi excluído com sucesso." };
                }
                else
                {
                    return new DtoDefaultResponse { ResponseCode = 204, ResponseMessage = $"O produto {productId} não foi encontrado." };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
