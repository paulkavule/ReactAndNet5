using System;
using System.Collections.Generic;
using ReactAndNet5.Reactivities.Application.Profiles;

namespace ReactAndNet5.Reactivities.Application.Activities
{
  
    public class ActivityDto
    {
        
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description {set;get;}
        public string Category {set;get;}
        public string City {set;get;}
        public string Venue {set;get;}
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<AttendeeDto> Attendees { get; set; }
    }
}