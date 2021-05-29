using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.ApiModels.Account
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string Email { get; set; }
    }
}
