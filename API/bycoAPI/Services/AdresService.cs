using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
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

        public Task<Result> SetAdres(int user_id, string adres)
        {
            var temp = _dbContexts.Adresler.SingleOrDefault(t=> t.user_id == user_id);
            if (temp is null) {
                Adresler t = new() {
                    adres = adres,
                    adres_id = 0,
                    user_id = user_id
                };
                _dbContexts.Adresler.Add(t);
                _dbContexts.SaveChanges();
                return Task.FromResult(new Result(true, "OK"));
            }
            temp.adres = adres;
            _dbContexts.SaveChanges();
            return Task.FromResult(new Result(true, "OK"));
        }
    }
}
