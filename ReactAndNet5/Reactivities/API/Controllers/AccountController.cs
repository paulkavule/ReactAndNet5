using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAndNet5.Reactivities.API.DTOs;
using ReactAndNet5.Reactivities.API.Services;
using ReactAndNet5.Reactivities.Domain;

namespace ReactAndNet5.Reactivities.API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("users/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signinMananger;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signinMananger, TokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userManager = userManager;
            this._signinMananger = signinMananger;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signinMananger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

           return CreateUser(user);
        }

         [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await  _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                ModelState.AddModelError("Email", "Email Taken");
                return ValidationProblem(ModelState);
            }
            if(await  _userManager.Users.AnyAsync(u => u.UserName == registerDto.UserName))
            { 
                ModelState.AddModelError("Email", "Email Taken");
                return ValidationProblem(ModelState);
            }

            var user= new AppUser{
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName
            };

            var result  = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return Unauthorized("There was a problem registering a user");

            return CreateUser(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUser()
        {
           var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

           return CreateUser(user);
        }

        private UserDto CreateUser(AppUser user){

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}