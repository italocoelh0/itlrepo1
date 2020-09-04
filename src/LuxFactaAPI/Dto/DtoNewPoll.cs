using LuxFactaAPI.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LuxFactaAPI.Dto
{
    public class DtoNewPoll
    {
        [Required]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "A descrição da enquete deve conter entre 3 e 200 caracteres.")]
        public string Poll_description { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "É necessário informar ao menos 2 opções de escolha para uma nova enquete.")]
        public IEnumerable<NewPollOption> Options { get; set; }
    }

    public class NewPollOption
    {
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Option_description { get; set; }
    }
}
