
using Newtonsoft.Json;

namespace cynology_backend.Models.Identity
{
    public class LoginModel
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
