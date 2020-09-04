using LuxFactaAPI.Data;
using LuxFactaAPI.Dto;
using LuxFactaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LuxFactaAPI.Controllers
{
    [Route("/poll")]
    [ApiController]
    [Produces("application/json")]
    public class PollsController : ControllerBase
    {
        private readonly LuxFactaAPIContext _context;

        public PollsController(LuxFactaAPIContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Get details from specific Poll
        /// </summary>
        /// <param name="id">Poll Identifier</param>
        /// <returns>Returns Poll informations</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<DtoGetPollResponse>> GetPollById(int id)
        {
            Poll poll = await _context.Polls
                                     .Include(j => j.Options)
                                     .Where(w => w.Poll_id == id)
                                     .FirstOrDefaultAsync();

            if (poll == null)
            {
                return NotFound();
            }
            else
            {
                poll.Views += 1;

                _context.Polls.Update(poll);
                await _context.SaveChangesAsync();

                return Ok(new DtoGetPollResponse
                {
                    Poll_id = poll.Poll_id,
                    Poll_description = poll.Poll_description,
                    Options = poll.Options
                });
            }
        }

        /// <summary>
        /// Post a new Poll
        /// </summary>
        /// <param name="poll">poll informations</param>
        /// <returns>Returns Poll Identifier</returns>
        [HttpPost]
        public async Task<ActionResult<DtoNewPollResponse>> PostPoll(DtoNewPoll poll)
        {
            var options = new List<PollOption>();

            foreach (var opt in poll.Options)
                options.Add(new PollOption { Option_description = opt.Option_description });

            Poll _poll = new Poll
            {
                Poll_description = poll.Poll_description,
                Options = options
            };

            _context.Polls.Add(_poll);
            await _context.SaveChangesAsync();

            return Ok(new DtoNewPollResponse
            {
                Poll_id = _poll.Poll_id
            });
        }

        /// <summary>
        /// Post new vote
        /// </summary>
        /// <param name="id">Poll Identifier</param>
        /// <param name="optionId">Selected Option Identifier</param>
        /// <returns>Return created vote informations</returns>
        [HttpPost("{id}/vote")]
        public async Task<ActionResult<Vote>> PostVote(int id, int optionId)
        {
            Poll polls = _context.Polls
                    .Include(j => j.Options)
                    .Where(w => w.Poll_id == id)
                    .FirstOrDefault();

            if (polls == null)
                return NotFound("A enquete informada não foi encontrada.");
            else if (polls.Options.Where(w => w.Option_id == optionId).Count() == 0)
                return NotFound("Não foi possível encontra o vínculo da opção selecionada com a enquete.");
            else
            {

                Vote _vote = new Vote { Poll_Id = id, Option_Id = optionId };

                _context.Votes.Add(_vote);

                await _context.SaveChangesAsync();

                return Ok(CreatedAtAction("GetVote", new { id = _vote.Vote_Id }, _vote));
            }
        }

        /// <summary>
        /// Get stats of specific Poll
        /// </summary>
        /// <param name="id">Poll Identifier</param>
        /// <returns>Returns number os views and any options votes</returns>
        [HttpGet("{id}/stats")]
        public async Task<ActionResult<DtoGetStats>> GetStatsById(int id)
        {
            Poll poll = await _context.Polls
                                .Include(j => j.Options)
                                .Where(w => w.Poll_id == id)
                                .FirstOrDefaultAsync();
            if (poll == null)
            {
                return NotFound("Não foi encontrado a enquete informada.");
            }
            else
            {
                DtoGetStats stats = new DtoGetStats { Views = poll.Views, Votes = new List<VoteStats>() };
                int[] options = poll.Options.Select(s => s.Option_id).ToArray();

                foreach (int option in options)
                {
                    stats.Votes.Add(new VoteStats
                    {
                        Option_id = option,
                        Qty = await _context.Votes.Where(w => w.Poll_Id == id && w.Option_Id == option).CountAsync()
                    });
                }

                return Ok(stats);
            }
        }
    }
}
