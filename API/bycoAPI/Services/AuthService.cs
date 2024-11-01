using bycoAPI.Interfaces;
using bycoAPI.Models;

namespace bycoAPI.Services
{
    public class AuthService : IAuthService
    {
        readonly ITokenService _tokenService;
        readonly DbContexts _dbContexts;

        public AuthService(ITokenService tokenService, DbContexts dbContexts)
        {
            this._tokenService = tokenService;
            this._dbContexts = dbContexts;
        }
        public async Task<LoginResp> LoginUserAsync(LoginReq request)
        {
            LoginResp response = new();

            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.password))
            {
                response.AuthenticateResult = false;
                return response;
            }

            User user = await Login(request.email, request.password);

            if (user.email!=null)
            {
                var generatedTokenInformation = await _tokenService.GenerateToken(new GenerateTokenRequest { email = request.email });

                response.AuthenticateResult = true;
                response.AuthToken = generatedTokenInformation.Token;
                response.AccessTokenExpireDate = generatedTokenInformation.TokenExpirationDate;
                return response;
            }
            else
            {
                response.AuthenticateResult = false;
                return response;
            }
        }

        public async Task<User> Login(string username, string password)
        {
            User user = _dbContexts.Users.FirstOrDefault(u=>u.email== username && u.password==password);
            if (user == null) {return null;}

            return user;
        }
    }
}
