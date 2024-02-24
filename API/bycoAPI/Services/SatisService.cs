using System.Text;
using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

using System.Security.Cryptography;
using Microsoft.Extensions.Configuration.UserSecrets;

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
                tarih = datetime_t.ToString(),
                fiyat = fiyat.fiyat * req.adet
            };
            _context.Satis.Add(temp);
            _context.SaveChangesAsync();
            var satis = _context.Satis.SingleOrDefault(t=> t.user_id == req.user_id && t.urun_id == fiyat.urun_id && req.adet == t.adet && t.tarih == datetime_t.ToString());
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
            var tempSession = _context.Sessions.SingleOrDefault(t=> t.session_key == checkout.session_key);
            if (tempSession is null) {
                return new Result(false, "Couln't find session.");
            }
            if (tempSession.expiration_date.CompareTo(DateTime.Now) <= 0) {
                _context.Sessions.Remove(tempSession);
                _context.SaveChanges();
                return new Result(false, "Session expired.");
            }

            var tUser = _context.Users.SingleOrDefault(t=> t.user_id == tempSession.user_id);
            if (tUser is null) {
                return new Result(false, "User not found.");
            }

            var tAdres = _context.Adresler.SingleOrDefault(t=> t.user_id == tUser.user_id);
            if (tAdres is null) {
                return new Result(false, "Address not found.");
            }

            var dt = DateTime.Now;

            var adresk = HashString(dt.Ticks.ToString());

            Siparis siparis = new() {
                siparis_id = 0,
                adres = tAdres.adres,
                siparis_kimlik = adresk,
                tarih = DateTime.Now,
                durum = "hazirlaniyor"
            };

            var tDis = _context.Discount.SingleOrDefault(t=> t.user_id == tUser.user_id);
            var indirim = 0;
            if (tDis is not null) {
                indirim = tDis.discount_rate;
            }

            _context.Siparis.Add(siparis);
            await _context.SaveChangesAsync();

            var tempsiparis = _context.Siparis.SingleOrDefault(t => t.siparis_kimlik == adresk);

            if (tempsiparis is null) {
                return new Result(false, "Could not create siparis");
            }

            foreach (var s in checkout.satilan_urunler) {
                int urunid = int.Parse(s[0]);
                int urunadet = int.Parse(s[1]);
                var urun = _context.Urun.SingleOrDefault(t=> t.urun_id == urunid);
                if (urun is null) {
                    return new Result(false, "Could not find Urun");
                }
                
                NewSatisReq temp = new()
                {
                    user_id = tempSession.user_id,
                    urun_id = urunid,
                    adet = urunadet,
                };

                var datetime_t = DateTime.Now;
                Satis tempsatis = new()
                {
                    satis_id = 0,
                    user_id = temp.user_id,
                    urun_id = urun.urun_id,
                    adet = temp.adet,
                    tarih = datetime_t.ToString(),
                    fiyat = urun.fiyat * temp.adet * (100-indirim) / 100
                };
                _context.Satis.Add(tempsatis);
                await _context.SaveChangesAsync();
                var satis = _context.Satis.SingleOrDefault(t=> 
                    t.user_id == temp.user_id 
                    && t.urun_id == urun.urun_id 
                    && temp.adet == t.adet 
                    && t.tarih.Equals(datetime_t.ToString())
                    
                );
                if (satis is null) {
                    return new Result(false, "could not find satis");
                }
                SiparisSatis tempss = new() {
                    siparissatis_id = 0,
                    siparis_id =  tempsiparis.siparis_id,
                    satis_id = satis.satis_id
                };
                _context.SiparisSatis.Add(tempss);
                await _context.SaveChangesAsync();
            }

            return new Result(true, "OK");
        }
        private string HashString(string text) {
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            return hashString;
        }
        public Task<DataResult<List<MusteriBilgi>>> MusteriBilgileri() {
            var userlist = _context.Users.ToList();
            List<MusteriBilgi> result = [];
            foreach (var i in userlist) {
                var satislist = _context.Satis.Where(t=> t.user_id == i.user_id).ToList();
                int sum = 0;
                foreach (var j in satislist) {
                    sum += (int)j.fiyat;
                }
                
                string disc = "0";

                var tempDiscount = _context.Discount.SingleOrDefault(t=> t.user_id == i.user_id);
                if (tempDiscount is not null) {
                    disc = tempDiscount.discount_rate.ToString();
                }

                MusteriBilgi t = new() {
                    ad = i.ad + " " + i.soyad,
                    id = i.user_id.ToString(),
                    indirim = disc,
                    tip = i.tip.ToString(),
                    tutar = sum.ToString()
                };
                result.Add(t);
            }

            return Task.FromResult(new DataResult<List<MusteriBilgi>>(true, result));
        }

        public Task<DataResult<List<SiparisBilgi>>> SiparisBilgileri()
        {
            var tempSiparisler = _context.Siparis.ToList();
            tempSiparisler.Sort((x, y) => DateTime.Compare(x.tarih, y.tarih));
            List<SiparisBilgi> result = [];
            foreach (var i in tempSiparisler) {
                var tempUser = _context.Users.SingleOrDefault(t=> t.user_id == i.user_id);
                if (tempUser is null) {
                    continue;
                }
                int adet = 0;
                var tempSipSat = _context.SiparisSatis.Where(t=> t.siparis_id == i.siparis_id).Select(t=> t.satis_id);
                var tempSatisList = _context.Satis.Where(t=> tempSipSat.Contains(t.satis_id)).ToList();
                foreach (var j in tempSatisList)
                {
                    adet += j.adet;
                }
                SiparisBilgi t = new() {
                    durum = i.durum,
                    musteri = tempUser.ad + " " + tempUser.soyad,
                    siparis_id = i.siparis_id.ToString(),
                    tarih = i.tarih.ToShortDateString(),
                    urunadedi = adet.ToString(),
                };
                result.Add(t);        
            }
            return Task.FromResult(new DataResult<List<SiparisBilgi>>(true, result));
        }
    }
}
