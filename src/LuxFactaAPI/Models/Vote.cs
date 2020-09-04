using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuxFactaAPI.Models
{
    public class Vote
    {
        [Key]
        public int Vote_Id { get; set; }

        [ForeignKey("Polls")]
        public int Poll_Id { get; set; }

        [ForeignKey("Options")]
        public int Option_Id { get; set; }

    }
}
