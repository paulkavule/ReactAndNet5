using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Application.Interfaces;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
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

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUser = _accessor.GetUserName() })
                // .Include(a => a.Attendees)
                // .ThenInclude(u => u.AppUser)
                .ToListAsync();

                //  var activities = _mapper.Map<List<ActivityDto>>(result);
                return Result<List<ActivityDto>>.Success(result);
            }
        }
    }
}