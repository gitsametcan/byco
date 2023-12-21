using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class SatisService : ISatisService
    {

        public Task<Satis> GetSatisByIdAsync(int id)
        {
            return Task.FromResult(GetSatisFromDb(id));
        }

        private static Satis GetSatisFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new Satis { 
                id = 23,
                user_id = 23,
                urun_id = 23,
                tarih = DateTime.Now,
                adet = 1,
                fiyat = 10000000
            };
        }

        
    }
}
