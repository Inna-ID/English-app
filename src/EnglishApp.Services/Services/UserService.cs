using EnglishApp.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishApp.Services.Services
{
    public static class UserService
    {
        public static List<UserDto> Users;
        static UserService()
        {
            Users = new List<UserDto> {
                new UserDto
                {
                   Id = 1,
                   Email = "inna@domain.com",
                   PasswordHash = "123".GetHashCode(),
                   Role = "Administrator"
                }
            };
        }

        public static UserDto GetUser(string email, int passwordHash)
        {
            return Users.FirstOrDefault(x => x.Email == email && x.PasswordHash == passwordHash);
        }

    }
}
