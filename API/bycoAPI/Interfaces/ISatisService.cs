using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface ISatisService
    {
        public Task<Satis> GetSatisByIdAsync(int id);
        
        public Task<List<Satis>> GetSatisOfUser(int user_id);

        public Task<Result> AddSatis(NewSatisReq req);

        public Task<Result> UpdateSatis(int satis_id, Satis body);

        public Task<Result> DeleteSatis(int satis_id);
    }
}
