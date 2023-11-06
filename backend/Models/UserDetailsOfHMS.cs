using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystemWebAPI.Models
{
    public class UserDetailsOfHMS
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Name Is Requird")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Email Is Required")]
        [EmailAddress(ErrorMessage = "This field should have a proper Email Address")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Phone Number is Required")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "The phone number should only contain numbers")]
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
    }
}
