using Microsoft.AspNetCore.Mvc;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace cynology_backend.Controllers;

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

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        CynologyUser user = new CynologyUser
        {
            Name = model.Name,
            Surname = model.Surname,
            Address = model.Address,
            UserName = model.Username,
            PasswordHash = model.Password,
        };

        IdentityResult result = await userManager.CreateAsync(user, user.PasswordHash!);
        if (result.Succeeded)
        {
            return Ok("Registration made successfully");
        }

        return BadRequest($"Error occured: {result.Errors}");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(
            userName: model.Username,
            password: model.Password,
            isPersistent: true,
            lockoutOnFailure: false);

        if (result.Succeeded)
        {
            CynologyUser? user = await userManager.FindByNameAsync(model.Username);
            if (user != null)
            {
                CynologyUser userData = new CynologyUser
                {
                    UserName = user.UserName,
                    Name = user.Name,
                    Surname = user.Surname
                };

                return Ok(userData);
            }
            else
            {
                return BadRequest($"User not found, result: {result}");
            }
        }
        else
        {
            return BadRequest($"Invalid credentials, result: {result}");
        }
    }
}
