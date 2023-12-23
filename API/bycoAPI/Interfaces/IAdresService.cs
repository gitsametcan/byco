using bycoAPI.Models;
using bycoAPI.Utils;
using Microsoft.AspNetCore.Mvc;

namespace bycoAPI.Interfaces
{
    public interface IAdresService
    {
        public Task<ActionResult<IEnumerable<Adresler>>> GetUserAdresses(int user_id);
        public DataResult<Proje> AdresKaydet(Proje proje);
    }
}
