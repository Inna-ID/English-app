using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EnglishApp.Infrastructure
{
    public class AuthOptions
    {
        public string Issuer { get; set; } // token issuer
        public string Audience { get; set; } // token consumer
        public string Key { get; set; }   // encryption key
        public int LifeTime { get; set; } // token timout in minutes
        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
