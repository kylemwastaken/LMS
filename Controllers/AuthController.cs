using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Models;
using LMS.DTOs;
using LMS.Utilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using System.Linq;




namespace LMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IConfiguration _config;
    
   

    public AuthController(LibraryContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
        
        
    }
   [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {
        // ✅ Validate model (including email format)
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        
        // ✅ Validate password
        if (!PasswordValidator.IsValid(dto.Password, out var error))
            return BadRequest(new { message = error });

        // ✅ Check if email already exists
        if (_context.Members.Any(m => m.Email == dto.Email))
            return BadRequest(new { message = "Email already exists" });

        // ✅ Create new member 
        var member = new Member
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role ?? "Member",
            BorrowLimit = 3,
            EmailConfirmed = false
        };
       

        _context.Members.Add(member);
        _context.SaveChanges();

        return Ok(new { message = "Registration successful", memberId = member.MemberId });
    }



   

     

[HttpPost("login")]
public IActionResult Login([FromBody] LoginDto dto)
{
    var member = _context.Members.FirstOrDefault(m => m.Email == dto.Email);
    if (member == null)
        return Unauthorized(new { message = "Invalid credentials" });

    bool validPassword = BCrypt.Net.BCrypt.Verify(dto.Password, member.PasswordHash);
    if (!validPassword)
        return Unauthorized(new { message = "Invalid credentials" });

    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, member.MemberId.ToString()),
            new Claim(ClaimTypes.Role, member.Role)
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
    };
    var keyString = _config["Jwt:Key"];
    Console.WriteLine($"[GENERATION] Jwt:Key = {keyString}");


    var jwtKey = _config["Jwt:Key"];
    

     if (string.IsNullOrEmpty(jwtKey))
     {
     throw new InvalidOperationException("JWT Key is missing in configuration.");
    }

    

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return Ok(new { token = tokenHandler.WriteToken(token), role = member.Role });
}

[HttpPost("confirm-email")]
public IActionResult ConfirmEmail([FromQuery] string token)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);
    var jwtKey = _config["Jwt:Key"];
    var keyString = _config["Jwt:Key"];
    Console.WriteLine($"[VALIDATION] Jwt:Key = {keyString}");


    try
    {
        var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        }, out SecurityToken validatedToken);

        var memberId = int.Parse(principal.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

        var member = _context.Members.Find(memberId);
        if (member == null)
            return NotFound(new { message = "Member not found" });

        if (member.EmailConfirmed)
            return BadRequest(new { message = "Email already confirmed" });

        member.EmailConfirmed = true;
        _context.SaveChanges();

        return Ok(new { message = "Email confirmed successfully" });
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = "Invalid or expired token", error = ex.Message });
    }
}


}