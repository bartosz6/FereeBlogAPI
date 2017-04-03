using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Infrastructure.Auth.Jwt;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;
using Sso.Services;
using Infrastructure.Context;
using Newtonsoft.Json.Serialization;
using WebApplication.Models;
using WebApplication.Data;

namespace WebApplication
{
    public class Startup
    {
        private SecurityKey _key;
        private TokenAuthOptions _tokenAuthOptions;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }

            _key = new StaticKeyGen().Key;
            _tokenAuthOptions = new TokenAuthOptions()
            {
                Audience = "http://localhost:5000",
                Issuer = "issurer",
                SigningCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256)
            };

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }


        private IContainer _container;

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                })
            );

            // Add framework services.
            var connectionString = Configuration["ConnectionString"];
            if(connectionString == null) throw new ArgumentException("no connection string");

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc(options =>
            {
                options.Filters.Add(
                    new AuthorizeFilter(
                        (new AuthorizationPolicyBuilder())
                        .RequireAuthenticatedUser()
                        .Build()
                    )
                );
            })
            .AddControllersAsServices()
            .AddJsonOptions(options =>
                  {
                      options.SerializerSettings.ContractResolver =
                          new CamelCasePropertyNamesContractResolver();
                  });



            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);

            RegisterDI(containerBuilder);

            _container = containerBuilder.Build();
            return new AutofacServiceProvider(_container);
        }

        private void RegisterDI(ContainerBuilder containerBuilder)
        {
            //TokenAuthOptions
            containerBuilder
                .RegisterInstance(_tokenAuthOptions)
                .As<TokenAuthOptions>()
                .SingleInstance();

            containerBuilder
                .RegisterType<AuthService>()
                .As<IAuthService>()
                .SingleInstance();

            containerBuilder
                            .RegisterType<ApplicationDbContext>()
                            .As<ApplicationDbContext>()
                            .InstancePerLifetimeScope();



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            IApplicationLifetime appLifetime)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors("AllowAllOrigins");

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }

            app.UseDeveloperExceptionPage();

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = _tokenAuthOptions.Issuer,

                    ValidateAudience = true,
                    ValidAudience = _tokenAuthOptions.Audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateLifetime = true,
                }
            });

            app.UseMvc(options =>
            {
            });



            //Kill all dependencies
            appLifetime.ApplicationStopped.Register(() => _container.Dispose());
        }
    }
}
