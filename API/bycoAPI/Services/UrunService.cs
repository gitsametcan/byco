using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;

namespace bycoAPI.Services
{
    public class UrunService(DbContexts context) : IUrunService {
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
            Urun temp = new() {
                ad = req.ad,
                aciklama = req.aciklama,
                img = req.img,
                kategori_id = req.kategori_id,
                stok = req.stok,
                fiyat = req.fiyat
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
            tempUrun.kategori_id  = body.kategori_id   != default ? body.kategori_id    : tempUrun.kategori_id;
            tempUrun.img          = body.img           != default ? body.img            : tempUrun.img;
            tempUrun.fiyat        = body.fiyat         != default ? body.fiyat          : tempUrun.fiyat;

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

        public Task<UrunResponse> GetByIdResponse(int urun_id)
        {
            var tempUrun = GetUrunFromDb(urun_id);
            UrunResponse ur = new();
            ur.id = tempUrun.urun_id.ToString();
            ur.sku = "SADG34F2GOB"; //random
            ur.img = tempUrun.img;
            ur.title = tempUrun.ad;
            ur.slug = tempUrun.ad.Replace(' ', '-').ToLower();
            ur.unit = tempUrun.stok.ToString();
            var kat = _context.Kategori.SingleOrDefault(t=> t.kategori_id == tempUrun.kategori_id);
            ur.parent = kat.ad;
            ur.imageURLs = [];
            ImgUrlModel imgurlmodel = new()
            {
                color = new()
                {
                    name = "",
                    clrcode = "#111111"
                },
                img = ur.img
            };
            ur.imageURLs.Add(imgurlmodel);
            ur.children = kat.ad;
            ur.price = tempUrun.fiyat;
            ur.discount = 0.0;
            ur.quantity = tempUrun.stok;
            ur.brand = new BrandModel {
                name = "BYCO"
            };
            ur.category = new CategoryModel {
                name = kat.ad
            };
            if (tempUrun.stok > 0) {
                ur.status = "stakto";
            } else {
                ur.status = "tükendi";
            }
            ur.productType = "electronics";
            ur.description = tempUrun.aciklama;
            ur.additionalInformation = [];
            ur.sellCount = 10;
            var ozelliklistesi = _context.Ozellik.Where(t=> t.urun_id == tempUrun.urun_id).ToList();
            foreach (var ol in ozelliklistesi) {
                AdditionalInformationModel aim = new() {
                    key = ol.ozellik,
                    value = ol.aciklama
                };
                ur.additionalInformation.Add(aim);
            }
            return Task.FromResult(ur);
        }

        public Task<List<UrunResponse>> GetAllUrunResponse()
        {
            var urunList = _context.Urun.ToList();
            List<UrunResponse> asresponse = [];
            foreach (var u in urunList) {
                UrunResponse ur = new();
                ur.id = u.urun_id.ToString();
                ur.sku = "SADG34F2GOB"; //random
                ur.img = u.img;
                ur.title = u.ad;
                ur.slug = u.ad.Replace(' ', '-').ToLower();
                ur.unit = u.stok.ToString();
                var kat = _context.Kategori.SingleOrDefault(t=> t.kategori_id == u.kategori_id);
                ur.parent = kat.ad;
                ur.imageURLs = [];
                ImgUrlModel imgurlmodel = new()
                {
                    color = new()
                    {
                        name = "",
                        clrcode = "#111111"
                    },
                    img = ur.img
                };
                ur.imageURLs.Add(imgurlmodel);
                ur.children = kat.ad;
                ur.price = u.fiyat;
                ur.discount = 0.0;
                ur.quantity = u.stok;
                ur.brand = new BrandModel {
                    name = "BYCO"
                };
                ur.category = new CategoryModel {
                    name = kat.ad
                };
                if (u.stok > 0) {
                    ur.status = "stokta";
                } else {
                    ur.status = "tükendi";
                }
                ur.productType = "electronics";
                ur.description = u.aciklama;
                ur.sellCount = 10;
                ur.additionalInformation = [];
                var ozelliklistesi = _context.Ozellik.Where(t=> t.urun_id == u.urun_id).ToList();
                foreach (var ol in ozelliklistesi) {
                    AdditionalInformationModel aim = new() {
                        key = ol.ozellik,
                        value = ol.aciklama
                    };
                    ur.additionalInformation.Add(aim);
                }
                asresponse.Add(ur);
            }
            return Task.FromResult(asresponse);
        }
    }
}
