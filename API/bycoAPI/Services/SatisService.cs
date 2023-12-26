using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

namespace bycoAPI.Services
{
    public class SatisService(DbContexts context) : ISatisService
    {
        private readonly DbContexts _context = context;

        public Task<Result> AddSatis(NewSatisReq req) {
            var fiyat = _context.Urun.SingleOrDefault(t => t.urun_id == req.urun_id);
            if (fiyat is null) {
                return Task.FromResult(new Result(false, "Fiyat not found: " + req.urun_id));
            }
            var datetime_t = DateTime.Now;
            Satis temp = new()
            {
                satis_id = 0,
                user_id = req.user_id,
                urun_id = fiyat.urun_id,
                adet = req.adet,
                tarih = datetime_t,
                fiyat = fiyat.fiyat * req.adet
            };
            _context.Satis.Add(temp);
            _context.SaveChangesAsync();
            var satis = _context.Satis.SingleOrDefault(t=> t.user_id == req.user_id && t.urun_id == fiyat.urun_id && req.adet == t.adet && t.tarih == datetime_t);
            if (satis is null) {
                return Task.FromResult(new Result(false, "BadRequest"));
            }
            return Task.FromResult(new Result(true, "" + satis.satis_id));
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

        public Task<List<Satis>> GetAll()
        {
            return Task.FromResult(_context.Satis.ToList());
        }

        public async Task<Result> MakePurchase(Checkout checkout)
        {
            Siparis siparis = new() {
                siparis_id = 0,
                isim = checkout.isim,
                soyisim = checkout.soyisim,
                sirket_adi = checkout.sirket_adi,
                ulke = checkout.ulke,
                adres = checkout.adres_satiri,
                il_ilce = checkout.il_ilce,
                kita = checkout.kita,
                posta_kodu = checkout.posta_kodu,
                telefon = checkout.telefon,
                email = checkout.email,
                siparis_notu = checkout.siparis_notu
            };

            _context.Siparis.Add(siparis);
            await _context.SaveChangesAsync();

            var tempsiparis = _context.Siparis.SingleOrDefault(t=> 
                t.isim == siparis.isim
                && t.soyisim == siparis.soyisim
                && t.sirket_adi == siparis.sirket_adi
                && t.ulke == siparis.ulke
                && t.adres == siparis.adres
                && t.il_ilce == siparis.il_ilce
                && t.kita == siparis.kita
                && t.posta_kodu == siparis.posta_kodu
                && t.telefon == siparis.telefon
                && t.email == siparis.email
                && t.siparis_notu == siparis.siparis_notu
            );

            if (tempsiparis is null) {
                return new Result(false, "BadRequest");
            }

            foreach (var s in checkout.satilan_urunler) {
                int urunid = int.Parse(s);
                var urun = _context.Urun.SingleOrDefault(t=> t.urun_id == urunid);
                if (urun is null) {
                    return new Result(false, "BadRequest");
                }
                NewSatisReq temp = new()
                {
                    user_id = 0,
                    urun_id = urunid,
                    adet = 1,
                };
                var result = await AddSatis(temp);
                if (!result.Success) {
                    return new Result(false, "BadRequest");
                }
                SiparisSatis tempss = new() {
                    siparissatis_id = 0,
                    siparis_id =  tempsiparis.siparis_id,
                    satis_id = int.Parse(result.Message)
                };
                _context.SiparisSatis.Add(tempss);
                await _context.SaveChangesAsync();
            }

            return new Result(true, "OK");
        }
    }
}
