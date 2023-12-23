using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class DbContexts : DbContext
    {
        public DbContexts(DbContextOptions<DbContexts> options)
            : base(options)
        {

        }
        public DbSet<Adresler> Adresler { get; set; } = null!;
        //public DbSet<Fiyat> Fiyat { get; set; } = null!;
        //public DbSet<Ozellik> Ozellik { get; set; } = null!;
        public DbSet<Proje> Proje { get; set; } = null!;
        //public DbSet<Satis> Satis { get; set; } = null!;
        //ublic DbSet<Urun> Urun { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}
