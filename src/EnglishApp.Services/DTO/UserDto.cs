﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishApp.Services.DTO
{
    public class UserDto
    { 
        public int Id { get; set; }
        public string Email { get; set; }
        public int PasswordHash { get; set; }

    }
}
