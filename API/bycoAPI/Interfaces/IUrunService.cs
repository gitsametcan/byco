using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IUrunService
    {
        public Task<Urun> GetUrunByIdAsync(int id);
        public Task<List<Urun>> GetAllUrun();
        public Task<UrunResponse> GetByIdResponse(int urun_id);
        public Task<List<UrunResponse>> GetAllUrunResponse();
        public Task<Result> AddUrun(NewUrunReq req);
        public Task<Result> UpdateUrun(int urun_id, Urun body);
        public Task<Result> DeleteUrun(int urun_id);
    }
}
