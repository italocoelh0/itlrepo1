using Application.Dto;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private IOrderService _orderService { get; set; }


        [HttpGet]
        public ActionResult<IEnumerable<DtoOrder>> GetOrders()
        {
            try
            {
                return Ok(_orderService.ReadAllOrders());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult<DtoDefaultResponse> PostOrder([FromBody]DtoOrder order)
        {
            try
            {
                return Ok(_orderService.CreateOrder(order));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<DtoOrder> GetOrder(int id)
        {
            try
            {
                return Ok(_orderService.ReadOrder(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("")]
        public ActionResult<DtoDefaultResponse> PutOrder([FromBody]DtoOrder order)
        {
            try
            {
                return Ok(_orderService.UpdateOrder(order));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<DtoDefaultResponse> DeleteOrder(int id)
        {
            try
            {
                return Ok(_orderService.DeleteOrder(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
