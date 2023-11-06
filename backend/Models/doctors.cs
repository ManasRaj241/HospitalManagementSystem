using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystemWebAPI.Models
{
    public class Doctors
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? HospitalName { get; set; }
        public int PricePerHour { get; set; }
        public bool IsAvailable { get; set; }
        public string? Specialization { get; set; }
    }

}
