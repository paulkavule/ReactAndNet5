using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ReactAndNet5.Reactivities.Application.Core;
using ReactAndNet5.Reactivities.Persistance;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                //if(activity == null) return null;

                _context.Activities.Remove(activity);

               var result = await _context.SaveChangesAsync() > 0;

                if(result)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failed("Failed to delete item with id "+request.Id);
            }
        }
    }
}