namespace ReactAndNet5.Reactivities.Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string description = null)
        {
            StatusCode = statusCode;
            Message = message;
            Description = description;
        }

        public int StatusCode { get; set; } 
        public string Message { get; set; } 
        public string Description { get; set; } 

        
    }
}