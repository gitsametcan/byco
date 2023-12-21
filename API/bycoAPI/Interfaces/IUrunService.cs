using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IUrunService
    {
        public Task<Urun> GetUrunByIdAsync(int id);
    }
}
