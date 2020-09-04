using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LuxFactaAPI.Models
{
    public class Poll
    {
        [Key]
        public int Poll_id { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "A descrição da enquete deve conter entre 3 e 200 caracteres.")]
        public string Poll_description { get; set; }

        [NotNull]
        [DefaultValue(0)]
        public int Views { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "É necessário informar ao menos 2 opções de escolha para uma nova enquete.")]
        public IEnumerable<PollOption> Options { get; set; }
    }
}

