using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface ISatisService
    {
        public Task<Satis> GetSatisByIdAsync(int id);
    }
}
