using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using ReactAndNet5.Reactivities.Persistance;
using ReactAndNet5.Reactivities.Application.Activities;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.infrastructure.Security;
using ReactAndNet5.Reactivities.infrastructure.Photos;

namespace ReactAndNet5.Reactivities.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration _config){
             services.AddDbContext<DataContext>(opt => opt.UseSqlite(_config.GetConnectionString("DefaultConnection")));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy", policy =>{
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(_config.GetSection("Cloudinary"));
            return services;
        }
        
    }
}