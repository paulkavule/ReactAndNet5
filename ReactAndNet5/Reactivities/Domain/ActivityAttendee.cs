using System;

namespace ReactAndNet5.Reactivities.Domain
{
    public class ActivityAttendee
    {
        public string AppUserId {set;get;}
        public AppUser AppUser  {set;get;}
        public Guid ActivityId {set;get;}
        public Activity Activty { get; set; }
        public bool IsHost { get; set; }
    }
}