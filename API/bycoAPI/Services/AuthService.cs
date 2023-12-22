using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class AuthService : IAuthService
    {
        readonly ITokenService tokenService;
        readonly IUserServices userServices;

        public AuthService(ITokenService tokenService, IUserServices userServices)
        {
            this.tokenService = tokenService;
            this.userServices = userServices;
        }
        public async Task<LoginResp> LoginUserAsync(LoginReq request)
        {
            LoginResp response = new();

            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.password))
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (userServices.CheckUserExist(request))
            {
                var generatedTokenInformation = await tokenService.GenerateToken(new GenerateTokenReq { Username = request.email });


                response.AuthenticateResult = true;
                response.AuthToken = generatedTokenInformation.Token;
                response.AccessTokenExpireDate = generatedTokenInformation.TokenExpireDate;
            }

            return response;
        }
    }
}
