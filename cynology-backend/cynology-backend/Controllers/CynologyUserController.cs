using Microsoft.AspNetCore.Mvc;
using cynology_backend.Models.Identity;
using Microsoft.AspNetCore.Identity;
using cynology_backend.Data;
using static cynology_backend.Models.Identity.ServiceResponses;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace cynology_backend.Controllers;

[Route("api/CynologyUser")]
[ApiController]
public class CynologyUserController(UserManager<CynologyUser> userManager, SignInManager<CynologyUser> signInManager, DataContext dataContext, IConfiguration config) : ControllerBase
{
    private readonly UserManager<CynologyUser> userManager = userManager;
    private readonly SignInManager<CynologyUser> signInManager = signInManager;
    private readonly DataContext _dataContext = dataContext;
    private readonly IConfiguration config = config;

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
            return Ok(user);
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
            var userSession = new UserSession(user.Id, user.Name, user.Surname, user.UserName);
            string token = GenerateToken(userSession);

            if (user != null)
            {             
                return Ok(new LoginResponse(true, token!, "LoginCompleted", userSession));
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

    private string GenerateToken(UserSession userSession)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var userClaims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, userSession.Id),
                new Claim("Firstname", userSession.Name),
                new Claim("Surname", userSession.Surname),
                new Claim(ClaimTypes.Name , userSession.Username)
            };
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: userClaims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
