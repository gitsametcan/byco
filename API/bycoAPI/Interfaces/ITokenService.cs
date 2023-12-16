using bycoAPI.Models;

namespace bycoAPI.Interfaces
{
    public interface ITokenService
    {
        public Task<GenerateTokenResp> GenerateToken(GenerateTokenReq request);
    }
}
