using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class AuthService : IAuthService
    {
        readonly ITokenService tokenService;
        readonly IUserServices userServices;
        readonly DbContexts dbContexts;

        public AuthService(ITokenService tokenService, IUserServices userServices, DbContexts dbContexts)
        {
            this.tokenService = tokenService;
            this.userServices = userServices;
            this.dbContexts = dbContexts;
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

                User user = dbContexts.Users.FirstOrDefault(x => x.email == request.email&&x.password == request.password);

                response.AuthenticateResult = true;
                response.AuthToken = generatedTokenInformation.Token;
                response.AccessTokenExpireDate = generatedTokenInformation.TokenExpireDate;

                AuthRecord authRecord = new AuthRecord();
                authRecord.tokenexpiredate = generatedTokenInformation.TokenExpireDate;
                authRecord.user_id = user.user_id;
                authRecord.token=response.AuthToken;
                dbContexts.AuthRecord.Add(authRecord);
                dbContexts.SaveChangesAsync();

            }

            return response;
        }
    }
}
