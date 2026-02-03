using System;
using System.Linq;

namespace LMS.Utilities
{
    public static class PasswordValidator
    {
        public static bool IsValid(string password, out string errorMessage)
        {
            errorMessage = string.Empty;

            if (string.IsNullOrEmpty(password) || password.Length < 8)
            {
                errorMessage = "Password must be at least 8 characters long.";
                return false;
            }
            if (!password.Any(char.IsUpper))
            {
                errorMessage = "Password must contain at least one uppercase letter.";
                return false;
            }
            if (!password.Any(char.IsLower))
            {
                errorMessage = "Password must contain at least one lowercase letter.";
                return false;
            }
            if (!password.Any(char.IsDigit))
            {
                errorMessage = "Password must contain at least one digit.";
                return false;
            }
            if (!password.Any(ch => "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~".Contains(ch)))
            {
                errorMessage = "Password must contain at least one special character.";
                return false;
            }

            return true;
        }
    }
}
