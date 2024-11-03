using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface ISiparisService
    {
        public Task<RequestResponse> SiparisKaydet(HizliSiparis hp, string siparisno);
        public Task<RequestResponse> SiparisKargoda(int siparis_id);
        public Task<RequestResponse> OdemeAlindi(int siparis_id);
        public Task<List<SiparisOut>> GetSiparisForAdmin();
        public Task<SiparisOut> GetSiparisBySiparisNo(string orderid);
        public Task<List<SiparisOut>> GetSiparisForLasts(string maili);
        
    }
}