using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IOzellikService
    {
        public Task<Ozellik> GetOzellikByIdAsync(int id);
        public Task<List<Ozellik>> GetAll();
        public Task<Result> AddOzellik(Ozellik req);
        public Task<Result> UpdateOzellik(int ozellik_id, Ozellik body);
        public Task<Result> DeleteOzellik(int ozellik_id);
    }
}
