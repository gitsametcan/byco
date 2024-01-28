using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IKimlikNoService 
    {
        public Task<KimlikNo> GetKimlikNoByIdAsync(int id);
        public Task<List<KimlikNo>> GetAll();
        public Task<DataResult<string>> GetKimlikNoByUser(int user_id);
        public Task<Result> AddKimlikNo(KimlikNo req);
        public Task<Result> UpdateKimlikNo(int kimlik_id, KimlikNo body);
        public Task<Result> DeleteKimlikNo(int kimlik_id);


    }
}
