using System;

namespace ReactAndNet5.Reactivities.Application.Comments
{
    public class CommentDto
    {
        public int Id {set;get;}
        public string Body { get; set; }
        public string UserName {set;get;}
        public string DisplayName { get; set; }
        public DateTime CreatedAt {set;get;}
        public string Image { get; set; }

    }
}