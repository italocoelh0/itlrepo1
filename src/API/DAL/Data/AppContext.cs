using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public class AppContext : DbContext
{
    public AppContext(DbContextOptions<AppContext> options)
        : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderProduct>().HasKey(sc => new { sc.ProductId, sc.OrderId });

        modelBuilder.Entity<OrderProduct>()
            .HasOne<Product>(sc => sc.Product)
            .WithMany(s => s.OrderProducts)
            .HasForeignKey(sc => sc.ProductId);

        modelBuilder.Entity<OrderProduct>()
            .HasOne<Order>(sc => sc.Order)
            .WithMany(s => s.OrderProducts)
            .HasForeignKey(sc => sc.OrderId);

        var cascadeFKs = modelBuilder.Model.GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

        foreach (var fk in cascadeFKs)
            fk.DeleteBehavior = DeleteBehavior.Restrict;

        base.OnModelCreating(modelBuilder);
    }
}
