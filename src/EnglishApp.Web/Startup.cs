using EnglishApp.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp
{
    public class Startup
    {
        private IConfiguration configuration { get; set; }
        public Startup(IConfiguration config)
        {
            configuration = config;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            var authOptions = new AuthOptions();
            configuration.GetSection("AuthConfiguration").Bind(authOptions);
            services.Configure<AuthOptions>(configuration.GetSection("AuthConfiguration"));
            services.AddOptions<SpaOptions>("SpaConfiguration");
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,
                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,
                        ValidateLifetime = true,
                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // 1st -- tries return static files for requiest
            if (env.IsDevelopment())
            {
                app.Map(
                    "/js",
                    ctx => ctx.UseSpa(
                        spa =>
                        {
                            spa.UseProxyToSpaDevelopmentServer("http://localhost:3002/");
                        })); ;
            }
            else
            {
                app.UseStaticFiles();
            }
            // app.UseStaticFiles();
            // 2nd -- tries process request as API call
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // 3rd -- just return SPA view
            // Note: default page path and other settings are configured by SpaOptions
            app.UseSpa(x=> { });
        }
    }
}
