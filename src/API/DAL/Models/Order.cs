using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "É necessário informar o vencimento do pedido.")]
        public DateTime OrderValidity { get; set; }

        [Required]
        [Range(0, 9999999999999999.99, ErrorMessage = "O valor do produto deve ser maior do que 0")]
        public decimal OrderValue { get; set; }

        public decimal OrderDiscount { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
