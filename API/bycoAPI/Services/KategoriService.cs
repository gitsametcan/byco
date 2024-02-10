using bycoAPI.Interfaces;
using bycoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI.Services {
    public class KategoriService : IKategoriService {

        private readonly DbContexts _context;
        public KategoriService(DbContexts dbContexts)
        {
            _context = dbContexts;
        }

        public Task<List<KategoriResponse>> GetAll()
        {
            var kategoriler = _context.Kategori.ToList();
            List<KategoriResponse> result = new();
            foreach(var k in kategoriler) {
                KategoriResponse temp = new();
                temp.id = k.kategori_id.ToString();
                temp.parent = k.ad.ToString();
                temp.status = "Show";
                temp.productType = "electronic";
                temp.products = new();
                var urunler = _context.Urun.Where(t=> t.kategori_id == k.kategori_id);
                foreach (var u in urunler) {
                    temp.products.Add(u.urun_id.ToString());
                }
                result.Add(temp);
            }
            return Task.FromResult(result);
        }

        public Task<KategoriResponse> GetKategoriByIdAsync(int id)
        {
            var k = _context.Kategori.SingleOrDefault(t=> t.kategori_id == id);
            KategoriResponse temp = new();
            temp.id = k.kategori_id.ToString();
            temp.parent = k.ad.ToString();
            temp.status = "Show";
            temp.productType = "electronic";
            temp.products = new();
            var urunler = _context.Urun.Where(t=> t.kategori_id == k.kategori_id);
            foreach (var u in urunler) {
                temp.products.Add(u.urun_id.ToString());
            }
            return Task.FromResult(temp);
        }

        public Task<Result> AddKategori(Kategori req)
        {
            _context.Kategori.Add(req);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }
        public Task<Result> UpdateKategori(int kategori_id, Kategori body)
        {
            var kat = _context.Kategori.SingleOrDefault(t=> t.kategori_id == kategori_id);
            if (kat is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            kat.kategori_id = body.kategori_id != default ? body.kategori_id : kat.kategori_id;
            kat.parent_id = body.parent_id != default ? body.parent_id : kat.parent_id;
            kat.ad = body.ad != default ? body.ad : kat.ad;
            
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<Result> DeleteKategori(int kategori_id) {
            var kat = _context.Kategori.SingleOrDefault(t=> t.kategori_id == kategori_id);
            if (kat is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            _context.Kategori.Remove(kat);
            _context.SaveChangesAsync();
            return Task.FromResult(new Result(true, "OK"));
        }

        public Task<List<KategoriResponseValText>> GetAllValueText()
        {
            var katlist = _context.Kategori.ToList();
            List<KategoriResponseValText> result = [];
            foreach (var item in katlist) {
                KategoriResponseValText t = new() {
                    text = item.ad,
                    value = item.kategori_id.ToString()
                };
                result.Add(t);
            }

            return Task.FromResult(result);
        }
    }
}
