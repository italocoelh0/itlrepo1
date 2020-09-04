using System.ComponentModel.DataAnnotations;

namespace LuxFactaAPI.Models
{
    public class PollOption
    {
        [Key]
        public int Option_id { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Option_description { get; set; }
    }
}
