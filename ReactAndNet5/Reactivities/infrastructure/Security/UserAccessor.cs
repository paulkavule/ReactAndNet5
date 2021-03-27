using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ReactAndNet5.Reactivities.Application.Interfaces;

namespace ReactAndNet5.Reactivities.infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _accessor;
        public UserAccessor(IHttpContextAccessor accessor)
        {
            this._accessor = accessor;
        }

        public string GetUserName()
        {
           return _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}