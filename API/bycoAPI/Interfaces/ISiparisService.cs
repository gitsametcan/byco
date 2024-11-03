using bycoAPI.Models;
using Utils;

namespace bycoAPI.Interfaces
{
    public interface ISiparisService
    {
        public Task<RequestResponse> SiparisKaydet(HizliSiparis hp, string siparisno);
        public Task<RequestResponse> SiparisKargoda(string siparisno);
        public Task<RequestResponse> OdemeAlindi(string siparisno);
        public Task<List<SiparisOut>> GetSiparisForAdmin();
        public Task<SiparisOut> GetSiparisBySiparisNo(string orderid);
        public Task<List<SiparisOut>> GetSiparisForLasts(string maili);
        
    }
}