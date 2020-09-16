using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dto
{
    public class DtoProduct
    {
        public int ProductId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 5, ErrorMessage = "O nome do produto deve conter entre 5 e 255 caracteres.")]
        public string ProductName { get; set; }

        [Required]
        [Range(0, 9999999999999999.99, ErrorMessage = "O valor do produto deve ser maior do que 0")]
        public decimal ProductValue { get; set; }
    }
}
