namespace ReactAndNet5.Reactivities.Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value {set;get;}

        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T>{ IsSuccess = true, Value = value};
        public static Result<T> Failed(string error) => new Result<T>{IsSuccess = false, Error = error};
    }
}