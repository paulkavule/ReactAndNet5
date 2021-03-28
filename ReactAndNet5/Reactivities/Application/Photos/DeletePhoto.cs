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
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PublicId { get; set; }
        }

        public class Hanlder : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Hanlder(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._photoAccessor = photoAccessor;
                this._context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
                if(user == null) return null;

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.PublicId);
                if(photo == null) return null;

                if(photo.IsMain) return Result<Unit>.Failed("You can not delete your main photo");

                var result = await _photoAccessor.DeletePhoto(request.PublicId);

                if(result ==null) return Result<Unit>.Failed("Failed to delete photo");

                user.Photos.Remove(photo);

                if(await _context.SaveChangesAsync() > 0)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failed("Failed to delete photo from database");
            }
        }
    }
}