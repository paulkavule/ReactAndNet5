using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _accessor;
        private readonly DataContext _context;
        public IsHostRequirmentHandler(DataContext context, IHttpContextAccessor accessor)
        {
            this._context = context;
            this._accessor = accessor;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(" ============> userId "+userId);
            if (userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_accessor.HttpContext?.Request.
            RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());
             Console.WriteLine(" ============> activityId "+activityId);
            var attendee = _context.ActivityAttendees.AsNoTracking().
            FirstOrDefaultAsync(att => att.AppUserId == userId && att.ActivityId == activityId).Result;
             Console.WriteLine(" ============> attendee "+(attendee == null));

            if (attendee == null) return Task.CompletedTask;
            Console.WriteLine(" ============>Is attendee "+(attendee.IsHost));
            if (attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}