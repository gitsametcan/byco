using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IUrunService
    {
        public Task<Urun> GetUrunByIdAsync(int id);
        public Task<List<Urun>> GetAllUrun();
        public Task<RequestResponse> AddUrun(NewUrunReq req);
        public Task<RequestResponse> UpdateUrun(int urun_id, Urun body);
        public Task<RequestResponse> DeleteUrun(int urun_id);
    }
}
