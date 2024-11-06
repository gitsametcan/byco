using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using System.Reflection;

namespace bycoAPI.Services
{
    public class UrunService : IUrunService
    {
        private readonly DbContexts _context;

        public UrunService(DbContexts context)
        {
            _context = context;

        }

        public async Task<Product> GetUrunByIdAsync(int id)//ok
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<List<Product>> GetAllUrun()//ok
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<RequestResponse> AddUrun(Product urun)
        {
            Product urundb = await Copy(urun, "id");
            await _context.Products.AddAsync(urundb);
            await _context.SaveChangesAsync();
            return new RequestResponse { StatusCode = 200, ReasonString = "Ürün eklendi" };
        }

        public async Task<RequestResponse> UpdateUrun(int urun_id, Product body)
        {
            Product urun = await _context.Products.FindAsync(urun_id);
            if (urun == null)
            {
                return new RequestResponse{StatusCode=400,ReasonString="Ürün bulunamadı!"};
            }

            if(urun.id == urun_id){
                foreach (PropertyInfo property in typeof(Product).GetProperties())
            {
                if (property.CanWrite)
                {
                    var value = property.GetValue(body);
                    property.SetValue(urun, value);
                }
            }
            
            _context.Products.Update(urun);
            await _context.SaveChangesAsync();
            return new RequestResponse{StatusCode=200,ReasonString="Ürün güncellendi"};

            }
            else return new RequestResponse{StatusCode=331,ReasonString="Ürün uyuşmuyor!"};

            
        }

        public async Task<RequestResponse> DeleteUrun(int urun_id)//ok
        {
            RequestResponse response = new RequestResponse();
            Product urun = await _context.Products.FindAsync(urun_id);
            if (urun == null)
            {
                response.StatusCode = 400;
                response.ReasonString = "Ürün bulunamadı";
                return response;
            }

            _context.Products.Remove(urun);
            await _context.SaveChangesAsync();

            response.StatusCode = 200;
            response.ReasonString = "Ürün Silindi";
            return response;
        }

        public async Task<Product> Copy(Product source, string excludeProperty)
        {
            Product target = new Product();
            foreach (PropertyInfo property in typeof(Product).GetProperties())
            {
                if (property.Name != excludeProperty && property.CanWrite)
                {
                    var value = property.GetValue(source);
                    property.SetValue(target, value);
                }
            }
            return target;
        }

        public async Task<List<Product>> GetProductsByCategory(string category)
        {
            return await _context.Products.Where(p => p.kategori.Contains(category)).ToListAsync();
        }
    }
}
