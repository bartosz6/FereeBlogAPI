using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class BaseController : Controller
    {
        public ICommandDispatcher CommandDispatcher { get; set; }
        public IQueryDispatcher QueryDispatcher { get; set; }
        public IHttpContextAccessor HttpContextAccessor { get; set; }

        public IEnumerable<Claim> CurrentUserClaims
        {
            get
            {
                return HttpContextAccessor.HttpContext.User.Claims;
            }
        }

        public Guid? CurrentUserId
        {
            get
            {
                var stringGuid = CurrentUserClaims.FirstOrDefault(a => a.Type == ClaimTypes.Sid)?.Value;
                Guid id;
                Guid.TryParse(stringGuid, out id);
                return id;
            }
        }

        public bool IsLoggedIn {
            get {
                return CurrentUserId != null;
            }
        }
    }
}