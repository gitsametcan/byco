using bycoAPI.Interfaces;
using bycoAPI.Models;
using Utils;
using Microsoft.EntityFrameworkCore;
using Azure.Core;

namespace bycoAPI.Services
{
    public class UrunService(DbContexts context) : IUrunService {
        private readonly DbContexts _context = context;

        public async Task<Urun> GetUrunByIdAsync(int id)
    {
        return await _context.Urun.FindAsync(id);
    }

    public async Task<List<Urun>> GetAllUrun()
    {
        return await _context.Urun.ToListAsync();
    }

    public async Task<RequestResponse> AddUrun(Urun urun)
    {
        await _context.Urun.AddAsync(urun);
        await _context.SaveChangesAsync();
        return new RequestResponse{StatusCode = 200, ReasonString="Ürün eklendi"};
    }

    public async Task<Result> UpdateUrun(int urun_id, Urun body)
    {
        var urun = await _context.Urun.FindAsync(urun_id);
        if (urun == null)
        {
            return Result.Failure("Ürün bulunamadı.");
        }

        // Özellikleri güncelle
        urun.Name = body.Name;
        urun.Price = body.Price;
        // Diğer alanları da güncelleyin

        _context.Uruns.Update(urun);
        await _context.SaveChangesAsync();
        return Result.Success();
    }

    public async Task<RequestResponse> DeleteUrun(int urun_id)
    {
        RequestResponse response = new RequestResponse();
        Urun urun = await _context.Urun.FindAsync(urun_id);
        if (urun == null)
        {
            response.StatusCode = 400;
            response.ReasonString = "Ürün bulunamadı";
            return response;
        }

        _context.Urun.Remove(urun);
        await _context.SaveChangesAsync();

        response.StatusCode=200;
        response.ReasonString = "Ürün Silindi";
        return response;
    }
    }
}
