using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services {
    public class AdresService : IAdresService {

        public Task<Adresler> GetAdreslerByIdAsync(int id) {
            return Task.FromResult(GetAdresFromDb(id));
        }

        private static Adresler GetAdresFromDb(int id) {

            //Database'den geleni yazacaz
            return new Adresler { 
                adres_id = 23,
                user_id = 23,
                adres = "adres"
            };
        }
    }
}
