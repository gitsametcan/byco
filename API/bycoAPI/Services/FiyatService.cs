using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class FiyatService : IFiyatService
    {

        public Task<Fiyat> GetFiyatByIdAsync(int id)
        {
            return Task.FromResult(GetFiyatFromDb(id));
        }

        private static Fiyat GetFiyatFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new Fiyat { 
                urun_id = 23,
                ozellik = "özellikler",
                fiyat = 10000000
            };
        }

        
    }
}
