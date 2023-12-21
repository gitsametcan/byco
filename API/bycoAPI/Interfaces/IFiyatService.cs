using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IFiyatService
    {
        public Task<Fiyat> GetFiyatByIdAsync(int id);
    }
}
