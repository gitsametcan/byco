using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class DbContexts : DbContext
    {
        public DbContexts(DbContextOptions<DbContexts> options)
            : base(options)
        {

        }
        public DbSet<Siparis> Siparis { get; set; } = null!;
        public DbSet<Urun> Urun { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Category> Categories {get;set;} = null!;
    }
}
