using LuxFactaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LuxFactaAPI.Data
{
    public class LuxFactaAPIContext : DbContext
    {
        public LuxFactaAPIContext(DbContextOptions<LuxFactaAPIContext> options) : base(options)
        {
        }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<PollOption> Options { get; set; }
        public DbSet<Vote> Votes { get; set; }
    }
}
