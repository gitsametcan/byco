using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IUrunService
    {
        public Task<Product> GetUrunByIdAsync(int id);
        public Task<List<Product>> GetAllUrun();
        public Task<RequestResponse> AddUrun(Product urun);
        public Task<RequestResponse> UpdateUrun(int urun_id, Product urun);
        public Task<RequestResponse> DeleteUrun(int urun_id);
    }
}
