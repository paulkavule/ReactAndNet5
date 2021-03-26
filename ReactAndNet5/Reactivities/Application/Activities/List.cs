using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Domain;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
               var result = await _context.Activities.ToListAsync();
               return Result<List<Activity>>.Success(result);
            }
        }
    }
}