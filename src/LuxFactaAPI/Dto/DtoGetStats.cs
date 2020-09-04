using System.Collections.Generic;

namespace LuxFactaAPI.Dto
{
    public class DtoGetStats
    {
        public int Views { get; set; }
        public List<VoteStats> Votes { get; set; }
    }

    public class VoteStats
    {
        public int Option_id { get; set; }
        public int Qty { get; set; }
    }
}
