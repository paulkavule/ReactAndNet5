using FluentValidation;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(act => act.Category).NotEmpty();
            RuleFor(act => act.City).NotEmpty();
            RuleFor(act => act.Description).NotEmpty();
            RuleFor(act => act.Date).NotEmpty();
            RuleFor(act => act.Title).NotEmpty();
            RuleFor(act => act.Venue).NotEmpty();
        }
    }
}