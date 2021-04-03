using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ReactAndNet5.Reactivities.API.Services;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.infrastructure.Security;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.API.Extensions
{
    public static class IdentityServiceExtensions
    { 
        public static IServiceCollection AddIdentityServices(this IServiceCollection service,
        IConfiguration config){

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            service.AddIdentityCore<AppUser>(opt =>{
                opt.Password.RequiredLength = 4;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();
            service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>{
                opt.TokenValidationParameters =  new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
                    ValidateIssuerSigningKey  = true, 
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                opt.Events = new JwtBearerEvents{
                    OnMessageReceived = context => 
                    {
                        var accessToken = context.Request.Query["access_token"];
                         Console.WriteLine("===Token: "+accessToken);
                        var path = context.HttpContext.Request.Path;

                        if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat")){
                             Console.WriteLine("===Token 2 ==: "+accessToken);
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                    
                };
            });
            service.AddAuthorization(opt => {
                opt.AddPolicy("IsActivityHost", policy =>{
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            service.AddTransient<IAuthorizationHandler, IsHostRequirmentHandler>();
            service.AddScoped<TokenService>();
            return service;
        }
}
}