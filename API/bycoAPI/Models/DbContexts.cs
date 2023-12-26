using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Models
{
    public class DbContexts : DbContext
    {
        public DbContexts(DbContextOptions<DbContexts> options)
            : base(options)
        {

        }
        public DbSet<AuthRecord> AuthRecord { get; set; } = null!;
        public DbSet<Adresler> Adresler { get; set; } = null!;
        public DbSet<Ozellik> Ozellik { get; set; } = null!;
        public DbSet<Proje> Proje { get; set; } = null!;
        public DbSet<Siparis> Siparis { get; set; } = null!;
        public DbSet<SiparisSatis> SiparisSatis { get; set; } = null!;
        public DbSet<Satis> Satis { get; set; } = null!;
        public DbSet<Urun> Urun { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Kategori> Kategori { get; set; } = null!;
    }
}
