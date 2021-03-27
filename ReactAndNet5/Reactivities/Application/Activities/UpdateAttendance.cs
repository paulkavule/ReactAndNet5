using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _accessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                this._context = context;
                this._accessor = accessor;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var activity = await _context.Activities.Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _accessor.GetUserName());

                if(user == null) return null;

                var hostedUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance =  activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(attendance != null && hostedUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if(attendance != null && hostedUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                if(attendance == null){
                    attendance = new Domain.ActivityAttendee{
                        AppUser = user,
                        Activty = activity,
                        IsHost = false,
                    };

                    activity.Attendees.Add(attendance);

                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failed("Issue updating attendance");
                
            }
        }

    }
}