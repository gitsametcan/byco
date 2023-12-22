namespace bycoAPI.Utils
{
    public interface IResult
    {
        bool Success { get; }
        string Message { get; }
    }
}
