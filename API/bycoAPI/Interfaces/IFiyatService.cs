using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IFiyatService
    {
        public Task<Fiyat> GetFiyatByIdAsync(int id);
        public Task<List<Fiyat>> GetAll();
        public Task<List<Fiyat>> GetFiyatlarByUrun(int urun_id);
        public Task<Result> AddFiyat(Fiyat req);
        public Task<Result> UpdateFiyat(int fiyat_id, Fiyat body);
        public Task<Result> DeleteFiyat(int fiyat_id);


    }
}
