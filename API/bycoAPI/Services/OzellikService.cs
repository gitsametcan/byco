using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class OzellikService : IOzellikService
    {

        public Task<Ozellik> GetOzellikByIdAsync(int id)
        {
            return Task.FromResult(GetOzellikFromDb(id));
        }

        private static Ozellik GetOzellikFromDb(int id)
        {

            //Database'den geleni yazacaz
            return new Ozellik { 
                urun_id = 23,
                ozellik = "özellikler",
                aciklama = "aciklama"
            };
        }

        
    }
}
