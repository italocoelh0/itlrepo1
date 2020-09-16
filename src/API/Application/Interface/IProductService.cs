using Application.Dto;
using System.Collections.Generic;

namespace Application.Interface
{
    public interface IProductService
    {
        IEnumerable<DtoProduct> ReadAllProducts();

        DtoDefaultResponse CreateProduct(DtoProduct order);

        DtoProduct ReadProduct(int productId);

        DtoDefaultResponse UpdateProduct(DtoProduct product);

        DtoDefaultResponse DeleteProduct(int productId);
    }
}
