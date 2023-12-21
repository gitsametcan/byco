using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface IOzellikService
    {
        public Task<Ozellik> GetOzellikByIdAsync(int id);
    }
}
