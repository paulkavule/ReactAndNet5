using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                this._accessor = accessor;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.
                    FirstOrDefaultAsync(x => x.UserName == _accessor.GetUserName());

                var target =  await _context.Users.
                    FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);

                if(target == null) return null;

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id); 
                if(following == null){
                    following = new Domain.UserFollowing{
                        Observer = observer,
                        Target = target,
                    };
                    _context.UserFollowings.Add(following);
                }
                else{
                    _context.UserFollowings.Remove(following);
                }

               if( await _context.SaveChangesAsync() > 0)
               return Result<Unit>.Success(Unit.Value);

               return Result<Unit>.Failed("Failed to add following");
            }
        }
    }
}