using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Photos
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { set; get; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._photoAccessor = photoAccessor;
                this._context = context;

            }
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if(user == null) return null;

                var cloudResult = await _photoAccessor.AddPhoto(request.File);
                
                var photo = new Photo{
                    Id = cloudResult.PublicId,
                    Url = cloudResult.Url,
                    IsMain = user.Photos.Any(p =>p.IsMain) ? false : true
                };

                user.Photos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;

                if(result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failed("Problem while uploading photo");
            }
        }
    }
}