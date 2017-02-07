using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication.Data;
using Domain.User;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;

namespace WebApplication
{
    public class TokenAuthOptions
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
    }
    public class Startup
    {
        private SecurityKey _key;
        private TokenAuthOptions _to;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }


        private IContainer _container;

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);

            RegisterDI(containerBuilder);

            _container = containerBuilder.Build();
            return new AutofacServiceProvider(_container);
        }

        private void RegisterDI(ContainerBuilder containerBuilder)
        {
            _key = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes("wololololodsowejroj324")
            );

            _to = new TokenAuthOptions()
            {
                Audience = "audience",
                Issuer = "issurer",
                SigningCredentials = new SigningCredentials (
                        _key,
                        SecurityAlgorithms.HmacSha256)
            };

            //TokenAuthOptions
            containerBuilder
                .RegisterInstance(_to)
                .As<TokenAuthOptions>()
                .SingleInstance();
                
            var references = Assembly.GetEntryAssembly().GetReferencedAssemblies().ToList();
            foreach(var assembly in references) 
            {
                containerBuilder
                    .RegisterAssemblyTypes(Assembly.Load(assembly))
                    .Where(@type => 
                        @type.Name.EndsWith("Handler")
                        || @type.Name.EndsWith("Dispatcher")
                        || @type.Name.EndsWith("Command")
                        || @type.Name.EndsWith("Query")
                    )
                    .AsImplementedInterfaces();
            };
            
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

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                     ValidateIssuer = true,
                     ValidIssuer = _to.Issuer,

                     ValidateAudience = true,
                     ValidAudience = _to.Audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateLifetime = true,
                }
            });

            app.UseMvc(route => route.MapRoute(
                name: "default",
                template: "{controller=Home}/{action=Index}/{id?}"));

            //Kill all dependencies
            appLifetime.ApplicationStopped.Register(() => _container.Dispose());
        }
    }
}
