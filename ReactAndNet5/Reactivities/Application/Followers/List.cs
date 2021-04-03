using System.Collections.Generic;
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

namespace ReactAndNet5.Reactivities.Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>>
        {
            public string Predicate { get; set; }

            public string Userame { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                this._accessor = accessor;
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profiles.Profile>();
                switch(request.Predicate.ToLower()){
                    case "followers":
                        profiles = await _context.UserFollowings
                        .Where(ff => ff.Target.UserName == request.Userame)
                        .Select(ob => ob.Observer).ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currentUsername = _accessor.GetUserName()})
                        .ToListAsync();
                    break;
                    case "following":
                        profiles = await _context.UserFollowings
                        .Where(ff => ff.Observer.UserName == request.Userame)
                        .Select(ob => ob.Target).ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currentUsername = _accessor.GetUserName()})
                        .ToListAsync();
                    break;
                }
                return Result<List<Profiles.Profile>>.Success(profiles);
            }
        }
    }
}