using System.Linq;
using AutoMapper;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles(){
            CreateMap<Activity, Activity>();
            CreateMap<ActivityAttendee,  Activities.Profile>()
            .ForMember(a => a.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(a => a.Username, o => o.MapFrom(s => s.AppUser.UserName))
            // .ForMember(a => a.Image, o => o.MapFrom(s => s.AppUser.i))
            .ForMember(a => a.Bio, o => o.MapFrom(s => s.AppUser.Bios));


            CreateMap<Activity, Activities.ActivityDto>()
                .ForMember(m => m.HostUsername, s => s.MapFrom(a => a.Attendees.FirstOrDefault()
                .AppUser.UserName));
        }
    }
}