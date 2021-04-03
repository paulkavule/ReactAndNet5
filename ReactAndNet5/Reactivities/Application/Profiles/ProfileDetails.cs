using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Profiles
{
    public class ProfileDetails
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string UserName { set; get; }
        }

        public class Halder : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;
            public Halder(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                this._accessor = accessor;
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users.ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUsername = _accessor.GetUserName()})
                .SingleOrDefaultAsync(u => u.Username == request.UserName);

                if (profile == null) return null;

                return Result<Profile>.Success(profile);

            }
        }
    }
}