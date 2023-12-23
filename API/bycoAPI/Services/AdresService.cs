using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using bycoAPI.Utils;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Services {
    public class AdresService : IAdresService {

        private readonly DbContexts _dbContexts;
        public AdresService(DbContexts dbContexts)
        {
            _dbContexts = dbContexts;
        }

        public async Task<List<Adresler>> GetUserAdresses(int user_id)
        {
            if (_dbContexts.Adresler == null)
            {
                return null;
            }
            List<Adresler> adresses = _dbContexts.Adresler.Where(a => a.user_id == user_id).ToList();
            return adresses;
        }

        public DataResult<Adresler> AdresKaydet(Adresler adres)
        {
            _dbContexts.Adresler.Add(adres);
            _dbContexts.SaveChangesAsync();

            return new DataResult<Adresler>(true, "", adres);
        }

        Task<ActionResult<IEnumerable<Adresler>>> IAdresService.GetUserAdresses(int user_id)
        {
            throw new NotImplementedException();
        }
    }
}
