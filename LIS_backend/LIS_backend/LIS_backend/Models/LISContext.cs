using Microsoft.EntityFrameworkCore;

namespace LIS_backend.Models
{
    public class LISContext:DbContext 
    {
        public LISContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Invoice_Product> Invoice_Products { get; set; }
        public DbSet<StoreLocation> StoreLocation { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<User_Location> User_Locations { get; set; }
    }
}
