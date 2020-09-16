using Application.Dto;
using Application.Interface;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        private IProductService _productService { get; set; }


        [HttpGet]
        public ActionResult<IEnumerable<DtoProduct>> GetProducts()
        {
            try
            {
                return Ok(_productService.ReadAllProducts());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult<DtoDefaultResponse> PostProduct([FromBody]DtoProduct product)
        {
            try
            {
                return Ok(_productService.CreateProduct(product));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<DtoProduct> GetProduct(int id)
        {
            try
            {
                return Ok(_productService.ReadProduct(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("")]
        public ActionResult<DtoDefaultResponse> PutProduct([FromBody]DtoProduct product)
        {
            try
            {
                return Ok(_productService.UpdateProduct(product));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<DtoDefaultResponse> DeleteProduct(int id)
        {
            try
            {
                return Ok(_productService.DeleteProduct(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
