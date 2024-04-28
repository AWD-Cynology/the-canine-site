namespace cynology_backend.Models.Identity;

public class ServiceResponses
{
    public record class LoginResponse(bool Flag, string Token, string Message, UserSession userSession);
}
