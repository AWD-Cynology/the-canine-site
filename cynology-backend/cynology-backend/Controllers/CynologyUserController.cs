using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace cynology_backend.Controllers
{
    [Route("api/CynologyUser")]
    [ApiController]
    public class CynologyUserController : ControllerBase
    {
        private readonly UserManager<CynologyUser> userManager;
        private readonly SignInManager<CynologyUser> signInManager;

        public CynologyUserController(UserManager<CynologyUser> userManager, SignInManager<CynologyUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new CynologyUser()
            {
                Name = model.Name,
                Surname = model.Surname,
                Address = model.Address,
                UserName = model.Username,
                PasswordHash = model.Password,
            };
            var result = await userManager.CreateAsync(user, user.PasswordHash!);
            if (result.Succeeded)
                return Ok("Registration made successfully");

            return BadRequest("Error occured");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var signInResult = await signInManager.PasswordSignInAsync(
                  userName: model.Username,
                  password: model.Password,
                  isPersistent: true,
                  lockoutOnFailure: false
                  );
            if (signInResult.Succeeded)
            {   
                return Ok("You are successfully logged in");
            }
            return BadRequest("Error occured");
        }
    }
}
