using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

namespace bycoAPI.Services
{
    public class SatisService(DbContexts context) : ISatisService
    {
        private readonly DbContexts _context = context;

        public Task<Result> AddSatis(NewSatisReq req) {
            var fiyat = _context.Fiyat.SingleOrDefault(t => t.fiyat_id == req.fiyat_id);
            if (fiyat is null) {
                return Task.FromResult(new Result(false, "Fiyat not found: " + req.fiyat_id));
            }
            Satis temp = new()
            {
                satis_id = req.satis_id,
                user_id = req.user_id,
                urun_id = fiyat.urun_id,
                adet = req.adet,
                tarih = DateTime.Now,
                fiyat = fiyat.fiyat * req.adet
            };
            _context.Satis.Add(temp);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> UpdateSatis(int satis_id, Satis body)
        {
            var tempSatis = _context.Satis.SingleOrDefault(t=> t.satis_id == satis_id);
            if (tempSatis is null) {
                return Task.FromResult(new Result(false, "Satis not found: " + satis_id));
            }

            tempSatis.fiyat      = body.fiyat     != default ? body.fiyat      : tempSatis.fiyat;
            tempSatis.satis_id   = body.satis_id  != default ? body.satis_id   : tempSatis.satis_id;
            tempSatis.urun_id    = body.urun_id   != default ? body.urun_id    : tempSatis.urun_id;
            tempSatis.user_id    = body.user_id   != default ? body.user_id    : tempSatis.user_id;
            tempSatis.adet       = body.adet      != default ? body.adet       : tempSatis.adet;
            tempSatis.tarih      = body.tarih     != default ? body.tarih      : tempSatis.tarih;

            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "Updated Satis")); 
        }

        public Task<Result> DeleteSatis(int satis_id)
        {
            var tempSatis = _context.Satis.SingleOrDefault(t=> t.satis_id == satis_id);
            if (tempSatis is null) {
                return Task.FromResult(new Result(false, "Satis not found: " + satis_id));
            }

            _context.Satis.Remove(tempSatis);

            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "Deleted Satis")); 
        }

        public Task<Satis> GetSatisByIdAsync(int id) {
            return Task.FromResult(GetSatisFromDb(id));
        }

        public Task<List<Satis>> GetSatisOfUser(int user_id)
        {
            return Task.FromResult(
                _context.Satis.Where(t => t.user_id == user_id)
                .ToList<Satis>()
            );
        }

        private Satis GetSatisFromDb(int id) {
            return _context.Satis.SingleOrDefault(t => t.satis_id == id);
        }

        
    }
}
