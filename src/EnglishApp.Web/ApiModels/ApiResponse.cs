using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.ApiModels
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public Dictionary<string, string> ErrorMessages { get; set; }
        public bool IsSuccess { get; set; }
    }
}
