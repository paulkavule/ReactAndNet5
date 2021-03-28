using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Photos
{
    public class MainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._photoAccessor = photoAccessor;
                this._dataContext = dataContext;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());

                if(user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id ==request.Id);

                if(photo == null)return null;

                var currentMainPhoto = user.Photos.FirstOrDefault(ph => ph.IsMain);

                if(currentMainPhoto != null) 
                {
                    currentMainPhoto.IsMain = false;
                    photo.IsMain = true;
                }
                
                if(await _dataContext.SaveChangesAsync() > 0)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failed("Problem setting main photo");

            }
        }
    }
}