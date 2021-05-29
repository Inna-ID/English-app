using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EnglishApp.ApiModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnglishApp.Services.Services;
using EnglishApp.ApiModels.Account;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using EnglishApp.Infrastructure;

namespace EnglishApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AuthOptions _authOptions;
        public AccountController(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions.Value;
        }

        //example api/home/getauto/3
        [HttpPost]
        public JsonResult Login(LoginDocument model)
        {
            if (model == null)
                return new JsonResult(new ApiResponse<VoidResponse> { Data = new VoidResponse(), IsSuccess = false, ErrorMessages = new Dictionary<string, string> { { "data", "Login and password are empty" } } });
            if (model.Password == null || model.Password.Length == 0)
                return new JsonResult(new ApiResponse<VoidResponse> { Data = new VoidResponse(), IsSuccess = false, ErrorMessages = new Dictionary<string, string> { { "password", "Password can not be empty" } } });
            if (model.Email == null || model.Email.Length == 0)
                return new JsonResult(new ApiResponse<VoidResponse> { Data = new VoidResponse(), IsSuccess = false, ErrorMessages = new Dictionary<string, string> { { "email", "Email can not be empty" } } });

            var user = UserService.GetUser(model.Email, model.Password.GetHashCode());

            if (user == null)
                return new JsonResult(new ApiResponse<VoidResponse> { Data = new VoidResponse(), IsSuccess = false, ErrorMessages = new Dictionary<string, string> { { "general", "Email or password are incorrect" } } });

            var claims = new List<Claim>
            {
                 new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                  new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: _authOptions.Issuer,
                    audience: _authOptions.Audience,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(_authOptions.LifeTime)),
                    signingCredentials: new SigningCredentials(_authOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new ApiResponse<LoginResponse> { Data = new LoginResponse { Email = user.Email, Token = encodedJwt }, IsSuccess = true };
            return new JsonResult(response);
        // in requests must be
        //headers:
        //    {
        //        "Accept": "application/json",
        //            "Authorization": "Bearer " + token  // передача токена в заголовке
        //        }
        }
    }
}
