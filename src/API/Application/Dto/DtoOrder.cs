using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.Dto
{
    public class DtoOrder
    {
        public int? OrderId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "É necessário inserir ao menos um produto ao pedido.")]
        public IEnumerable<DtoProduct> Products { get; set; }

        [Required(ErrorMessage = "É necessário informar o vencimento do pedido.")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:d}")]
        public DateTime OrderValidity { get; set; }

        [Required]
        [Range(0, 9999999999999999.99, ErrorMessage = "O valor do pedido deve ser maior do que 0")]
        public decimal OrderValue { get; set; }

        public decimal OrderDiscount { get; set; }
    }
}