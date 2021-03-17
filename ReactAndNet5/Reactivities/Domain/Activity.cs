using System;

namespace ReactAndNet5.Reactivities.Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description {set;get;}
        public string Category {set;get;}
        public string City {set;get;}
        public string Venue {set;get;}
    }
}