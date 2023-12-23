using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

namespace bycoAPI.Services
{
    public class FiyatService : IFiyatService
    {

        private readonly DbContexts _context;

        public FiyatService(DbContexts context) {
            _context = context;
        }

        public Task<Result> AddFiyat(Fiyat req) {
            _context.Fiyat.Add(req);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> UpdateFiyat(int fiyat_id, Fiyat body) {
            var tempFiyat = _context.Fiyat.SingleOrDefault(t => t.fiyat_id == fiyat_id);
            if (tempFiyat is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }

            tempFiyat.fiyat_id = body.fiyat_id != default ? body.fiyat_id : tempFiyat.fiyat_id;
            tempFiyat.urun_id  = body.urun_id  != default ? body.urun_id  : tempFiyat.urun_id;
            tempFiyat.fiyat    = body.fiyat    != default ? body.fiyat    : tempFiyat.fiyat;
            tempFiyat.ozellik  = body.ozellik  != default ? body.ozellik  : tempFiyat.ozellik;

            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> DeleteFiyat(int fiyat_id) {
            var tempFiyat = _context.Fiyat.SingleOrDefault(t => t.fiyat_id == fiyat_id);
            if (tempFiyat is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _context.Fiyat.Remove(tempFiyat);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Fiyat> GetFiyatByIdAsync(int id) {
            return Task.FromResult(GetFiyatFromDb(id));
        }

        public Task<List<Fiyat>> GetFiyatlarByUrun(int urun_id) {
            return Task.FromResult(
                _context.Fiyat.Where(t => t.urun_id == urun_id).ToList()
            );
        }

        private Fiyat GetFiyatFromDb(int id) {
            return _context.Fiyat.SingleOrDefault(t => t.fiyat_id == id);
        }

        public Task<List<Fiyat>> GetAll()
        {
            return Task.FromResult(_context.Fiyat.ToList());
        }
    }
}
