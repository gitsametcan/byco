using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

namespace bycoAPI.Services
{
    public class UrunService(DbContexts context) : IUrunService
    {

        private readonly DbContexts _context = context;

        public Task<Urun> GetUrunByIdAsync(int id)
        {
            return Task.FromResult(GetUrunFromDb(id));
        }

        public Task<List<Urun>> GetAllUrun() {
            return Task.FromResult(_context.Urun.ToList<Urun>());
        }

        private Urun GetUrunFromDb(int id)
        {


            return _context.Urun.SingleOrDefault(t => t.urun_id == id);
        }

        public Task<Result> AddUrun(NewUrunReq req)
        {
            Urun temp = new()
            {
                ad = req.ad,
                aciklama = req.aciklama,
                img = req.img,
                kategori = req.kategori,
                stok = req.stok

            };
            _context.Urun.Add(temp);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> UpdateUrun(int urun_id, Urun body)
        {
            var tempUrun = _context.Urun.SingleOrDefault(t=> t.urun_id == urun_id);
            if (tempUrun is null) {
                return Task.FromResult(new Result(false, "Urun not found: " + urun_id));
            }

            tempUrun.urun_id      = body.urun_id       != default ? body.urun_id        : tempUrun.urun_id;
            tempUrun.ad           = body.ad            != default ? body.ad             : tempUrun.ad;
            tempUrun.stok         = body.stok          != default ? body.stok           : tempUrun.stok;
            tempUrun.aciklama     = body.aciklama      != default ? body.aciklama       : tempUrun.aciklama;
            tempUrun.kategori     = body.kategori      != default ? body.kategori       : tempUrun.kategori;
            tempUrun.img          = body.img           != default ? body.img            : tempUrun.img;

            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "Updated Urun")); 
        }

        public Task<Result> DeleteUrun(int urun_id)
        {
            var tempUrun = _context.Urun.SingleOrDefault(t=> t.urun_id == urun_id);
            if (tempUrun is null) {
                return Task.FromResult(new Result(false, "Urun not found: " + urun_id));
            }

            _context.Urun.Remove(tempUrun);

            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "Deleted Satis")); 
        }
    }
}
