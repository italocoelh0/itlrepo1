using LuxFactaAPI.Models;
using System.Collections.Generic;

namespace LuxFactaAPI.Dto
{
    public class DtoGetPollResponse
    {
        public int Poll_id { get; set; }

        public string Poll_description { get; set; }

        public IEnumerable<PollOption> Options { get; set; }
    }
}
