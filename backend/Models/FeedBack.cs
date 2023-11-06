namespace HospitalManagementSystemWebAPI.Models
{
    public class FeedBack
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string Feedback { get; set; }
    }
}
