using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using System.Reflection;
using System.Text;

namespace bycoAPI.Services
{
    public class SiparisService : ISiparisService
    {
        private readonly DbContexts _context;

        public SiparisService(DbContexts context)
        {
            _context = context;

        }

        public async Task<List<SiparisOut>> GetSiparisForAdmin()
        {
            List<Siparis> siparisler = await _context.Siparis.OrderByDescending(s => s.siparis_id).ToListAsync();

            List<SiparisOut> hizliSiparisler = [];

            foreach (Siparis s in siparisler)
            {
                SiparisOut hp = new SiparisOut();
                hp.siparis_id = s.siparis_id;
                hp.siparisno = s.siparisno;
                hp.ad = s.ad;
                hp.mail = s.mail;
                hp.telefon = s.telefon;
                hp.faturaadresi = s.faturaadresi;
                hp.teslimatadresi = s.teslimatadresi;
                hp.tarih = s.tarih;
                hp.durum = s.durum;
                hp.fiyat = s.fiyat;
                hp.urunler = [];
                var urunAdetCiftleri = s.urunler.Split('-', StringSplitOptions.RemoveEmptyEntries);

                foreach (var cift in urunAdetCiftleri)
                {
                    var parts = cift.Split('x');
                    if (parts.Length == 2
                        && int.TryParse(parts[0], out int urunId)
                        && int.TryParse(parts[1], out int adet))
                    {
                        // 2. Ürün ID'sine göre veritabanından ürünü getir
                        Product product = await _context.Products.FindAsync(urunId);

                        if (product != null)
                        {
                            // Ürün bulunduysa listeye ekle
                            hp.urunler.Add(product);
                        }
                    }
                }

                hizliSiparisler.Add(hp);

            }

            return hizliSiparisler;
        }

        public async Task<List<SiparisOut>> GetSiparisForLasts(string maili)
        {
            List<Siparis> siparisler = await _context.Siparis.Where(s => s.mail == maili).ToListAsync();

            List<SiparisOut> hizliSiparisler = [];

            foreach (Siparis s in siparisler)
            {
                SiparisOut hp = new SiparisOut();
                hp.siparis_id = s.siparis_id;
                hp.siparisno = s.siparisno;
                hp.ad = s.ad;
                hp.mail = s.mail;
                hp.telefon = s.telefon;
                hp.faturaadresi = s.faturaadresi;
                hp.teslimatadresi = s.teslimatadresi;
                hp.tarih = s.tarih;
                hp.durum = s.durum;
                hp.fiyat = s.fiyat;
                hp.urunler = [];
                var urunAdetCiftleri = s.urunler.Split('-', StringSplitOptions.RemoveEmptyEntries);

                foreach (var cift in urunAdetCiftleri)
                {
                    var parts = cift.Split('x');
                    if (parts.Length == 2
                        && int.TryParse(parts[0], out int urunId)
                        && int.TryParse(parts[1], out int adet))
                    {
                        // 2. Ürün ID'sine göre veritabanından ürünü getir
                        Product product = await _context.Products.FindAsync(urunId);

                        if (product != null)
                        {
                            // Ürün bulunduysa listeye ekle
                            hp.urunler.Add(product);
                        }
                    }
                }
                hizliSiparisler.Add(hp);

            }

            return hizliSiparisler;
        }

        public async Task<RequestResponse> SiparisKargoda(string siparis_id)
        {
            Siparis siparis = await _context.Siparis.Where(k=>k.siparisno == siparis_id).FirstAsync();
            siparis.durum = "Kargoya verildi";

            _context.Siparis.Update(siparis);
            await _context.SaveChangesAsync();

            return new RequestResponse { StatusCode = 200, ReasonString = "Siparis güncellendi" };
        }

        public async Task<RequestResponse> OdemeAlindi(string siparis_id)
        {
            Siparis siparis = await _context.Siparis.Where(k=>k.siparisno == siparis_id).FirstAsync();
            siparis.durum = "Odeme Alindi";

            _context.Siparis.Update(siparis);
            await _context.SaveChangesAsync();

            return new RequestResponse { StatusCode = 200, ReasonString = "Siparis güncellendi" };
        }

        public async Task<RequestResponse> SiparisKaydet(HizliSiparis hp, string siparisno)
        {
            Siparis siparis = new Siparis();
            siparis.siparisno = siparisno;
            siparis.ad = hp.aliciAdi;
            siparis.mail = hp.CustomerEmailAddress;
            siparis.faturaadresi = hp.faturaAdresi;
            siparis.teslimatadresi = hp.teslimatAdresi;
            siparis.telefon = hp.telefon;
            siparis.tarih = DateTime.Now;
            siparis.durum = "Ödemeye gönderildi";
            StringBuilder sb = new StringBuilder();

            foreach (OdemeUrun ou in hp.urunler)
            {
                sb.Append(ou.id.ToString() + "x" + ou.adet.ToString() + "-");
            }

            siparis.urunler = sb.ToString();
            siparis.fiyat = hp.TxnAmount.ToString();

            try
            {
                Siparis siparisdb = await Copy(siparis, "siparis_id");
                await _context.Siparis.AddAsync(siparisdb);
                await _context.SaveChangesAsync();
                return new RequestResponse { StatusCode = 200, ReasonString = "Kullanıcı eklendi" };

            }
            catch
            {
                return new RequestResponse { StatusCode = 400, ReasonString = "Hata olustu" };
            }
        }

        public async Task<Siparis> Copy(Siparis source, string excludeProperty)
        {
            Siparis target = new Siparis();
            foreach (PropertyInfo property in typeof(Siparis).GetProperties())
            {
                if (property.Name != excludeProperty && property.CanWrite)
                {
                    var value = property.GetValue(source);
                    property.SetValue(target, value);
                }
            }
            //target.password=HashString(target.password);
            return target;
        }

        public async Task<SiparisOut> GetSiparisBySiparisNo(string orderid)
        {
            Siparis s = await _context.Siparis.Where(s => s.siparisno == orderid).FirstOrDefaultAsync();


            SiparisOut hp = new SiparisOut();
            hp.siparis_id = s.siparis_id;
            hp.siparisno = s.siparisno;
            hp.ad = s.ad;
            hp.mail = s.mail;
            hp.telefon = s.telefon;
            hp.faturaadresi = s.faturaadresi;
            hp.teslimatadresi = s.teslimatadresi;
            hp.tarih = s.tarih;
            hp.durum = s.durum;
            hp.fiyat = s.fiyat;
            hp.urunler = [];
            var urunAdetCiftleri = s.urunler.Split('-', StringSplitOptions.RemoveEmptyEntries);

            foreach (var cift in urunAdetCiftleri)
            {
                var parts = cift.Split('x');
                if (parts.Length == 2
                    && int.TryParse(parts[0], out int urunId)
                    && int.TryParse(parts[1], out int adet))
                {
                    // 2. Ürün ID'sine göre veritabanından ürünü getir
                    Product product = await _context.Products.FindAsync(urunId);

                    if (product != null)
                    {
                        // Ürün bulunduysa listeye ekle
                        hp.urunler.Add(product);
                    }
                }
            }


            return hp;
        }
    }
}
