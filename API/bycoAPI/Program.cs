using bycoAPI.Services;
using bycoAPI.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using bycoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace bycoAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<DbContexts>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


            // var emailConfig = builder.Configuration.GetSection("EmailConfiguration").Get<EmailSeervice>();
            // builder.Services.AddSingleton(emailConfig);
            // builder.Services.AddScoped<IEmailSender, EmailSender>();

           builder.WebHost.ConfigureKestrel(serverOptions =>
{
   serverOptions.ListenAnyIP(5001, listenOptions =>
   {
       listenOptions.UseHttps("/etc/letsencrypt/live/bycobackend.online-0001/certificate.pfx", "Byco2024.");
   });

});


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<ICategoryService,CategoryService>();
            builder.Services.AddTransient<IEmailSender, EmailSender>();
            builder.Services.AddTransient<ISiparisService,SiparisService>();
            builder.Services.AddTransient<ITokenService, TokenService>();
            builder.Services.AddTransient<IUserServices, UserService>();
            builder.Services.AddTransient<IUrunService, UrunService>();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["AppSettings:ValidIssuer"],
                    ValidAudience = builder.Configuration["AppSettings:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Secret"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };


            });
            builder.Services.AddAuthorization();

            builder.Services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en");
            });
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowSpecificOrigins", builder =>
            //    {
            //        builder.WithOrigins("http://localhost", "https://bycobackend.online")
            //            .AllowAnyHeader()
            //            .AllowAnyMethod()
            //            .AllowCredentials(); // Çerezleri ve kimlik doğrulama bilgilerini göndermek için
            //    });
            //});
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
            //    app.UseSwagger();
            //    app.UseSwaggerUI();
            //}

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            

            //app.UseCors("AllowSpecificOrigins");


            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
