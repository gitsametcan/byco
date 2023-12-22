using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class UrunService : IUrunService
    {

        public Task<Urun> GetUrunByIdAsync(int id)
        {
            return Task.FromResult(GetUrunFromDb(id));
        }

        private static Urun GetUrunFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new Urun { 
                urun_id = 23,
                ad = "Ürün Adı",
                stok = 10,
                aciklama = "Bu bir açıklamadır.",
                kategori = "Kategorisi",
                img = "dosyayolu.png"
            };
        }

        
    }
}
