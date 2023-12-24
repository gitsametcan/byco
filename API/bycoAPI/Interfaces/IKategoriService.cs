using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface IKategoriService
    {
        public Task<KategoriResponse> GetKategoriByIdAsync(int id);
        public Task<List<KategoriResponse>> GetAll();
        public Task<Result> AddKategori(Kategori req);
        public Task<Result> UpdateKategori(int kategori_id, Kategori body);
        public Task<Result> DeleteKategori(int kategori_id);


    }
}
