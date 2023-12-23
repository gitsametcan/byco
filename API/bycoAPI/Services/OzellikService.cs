using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.EntityFrameworkCore;
using Utils;

namespace bycoAPI.Services
{
    public class OzellikService : IOzellikService
    {
        private readonly DbContexts _context;
        public OzellikService(DbContexts context) {
            _context = context;
        }

        public Task<Result> AddOzellik(Ozellik req) {
            _context.Ozellik.Add(req);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> UpdateOzellik(int ozellik_id, Ozellik body)
        {
            var tempOzellik = _context.Ozellik.SingleOrDefault(t => t.ozellik_id == ozellik_id);
            if (tempOzellik is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            tempOzellik.ozellik_id = body.ozellik_id != default ? body.ozellik_id : tempOzellik.ozellik_id;
            tempOzellik.ozellik = body.ozellik != default ? body.ozellik : tempOzellik.ozellik;
            tempOzellik.aciklama = body.aciklama != default ? body.aciklama : tempOzellik.aciklama;
            tempOzellik.urun_id = body.urun_id != default ? body.urun_id : tempOzellik.urun_id;
            
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }   


        public Task<Result> DeleteOzellik(int ozellik_id)
        {
            var tempOzellik = _context.Ozellik.SingleOrDefault(t => t.ozellik_id == ozellik_id);
            if (tempOzellik is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _context.Ozellik.Remove(tempOzellik);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<List<Ozellik>> GetAll()
        {
            return Task.FromResult(_context.Ozellik.ToList());
        }

        public Task<Ozellik> GetOzellikByIdAsync(int id)
        {
            return Task.FromResult(GetOzellikFromDb(id));
        }
     
        private Ozellik GetOzellikFromDb(int id)
        {
            //Database'den geleni yazacaz
            return _context.Ozellik.SingleOrDefault(t=>t.ozellik_id == id);
        }

        
    }
}
