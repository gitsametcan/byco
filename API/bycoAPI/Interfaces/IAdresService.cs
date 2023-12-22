using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IAdresService
    {
        public Task<Adresler> GetAdreslerByIdAsync(int id);
    }
}
