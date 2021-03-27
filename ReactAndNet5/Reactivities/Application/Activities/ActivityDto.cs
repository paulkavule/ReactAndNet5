using System;
using System.Collections.Generic;

namespace ReactAndNet5.Reactivities.Application.Activities
{
    public class Profile{
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
    }
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
        public ICollection<Profile> Attendees { get; set; }
    }
}