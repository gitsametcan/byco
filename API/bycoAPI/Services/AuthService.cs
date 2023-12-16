using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class AuthService : IAuthService
    {
        readonly ITokenService tokenService;

        public AuthService(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }
        public async Task<LoginResp> LoginUserAsync(LoginReq request)
        {
            LoginResp response = new();

            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (request.Username == "deneme" && request.Password == "123456")
            {
                var generatedTokenInformation = await tokenService.GenerateToken(new GenerateTokenReq { Username = request.Username });


                response.AuthenticateResult = true;
                response.AuthToken = generatedTokenInformation.Token;
                response.AccessTokenExpireDate = generatedTokenInformation.TokenExpireDate;
            }

            return response;
        }
    }
}
