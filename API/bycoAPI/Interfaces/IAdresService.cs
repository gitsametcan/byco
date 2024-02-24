using bycoAPI.Models;
using Utils;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Interfaces
{
    public interface IAdresService
    {
        public Task<ActionResult<IEnumerable<Adresler>>> GetUserAdresses(int user_id);
        public DataResult<Adresler> AdresKaydet(Adresler adres);
        public Task<Result> SetAdres(int user_id, string adres);
    }
}
