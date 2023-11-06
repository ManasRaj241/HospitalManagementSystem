using HospitalManagementSystemWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystemWebAPI.DatabaseContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        { 
        }

        public ApplicationDbContext() { }

        public virtual DbSet<Hospital> Hospitals { get; set; }

        public virtual DbSet<Doctors> Doctors { get; set; }

        public virtual DbSet<booking> Bookings { get; set; }

        public virtual DbSet<FeedBack> Feedbacks { get; set; }
        public virtual DbSet<UserDetailsOfHMS> AppUser { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Hospital>().HasData(
        new Hospital
        {
            Id = 2,
            HospitalName = "Manipal Hospital",
            HospitalServices = "Cardiology,Orthopedics,Neurology,Obstetrics,Pediatrics,Emergency Care"
        });
            modelBuilder.Entity<Hospital>().HasData(
        new Hospital
        {
            Id = 3,
            HospitalName = "Jayadeva Hospital",
            HospitalServices = "Orthopedics,Neurology,Pediatrics,Emergency Care"
        });
            modelBuilder.Entity<Doctors>().HasData(
        new Doctors
        {
            Id = 1,
            Name = "Manas Satapathy",
            Age = 23,
            HospitalName = "Manipal Hospital",
            PricePerHour = 20,
            IsAvailable = true,
            Specialization = "Neurology"
        }) ;
            
            modelBuilder.Entity<booking>().HasData(
        new booking
        {
            Id = 1,
            PatientName = "Manas Satapathy",
            DoctorName = "Manipal Hospital",
            Status = "Booked"
        });
            modelBuilder.Entity<FeedBack>().HasData(
        new FeedBack
        {
            Id = 1,
            PatientName = "Manas Satapathy",
            DoctorName = "Rakesh Giri",
            Feedback = "Amazing"
        });
            modelBuilder.Entity<UserDetailsOfHMS>().HasData(
            new UserDetailsOfHMS
            {
            UserId = 1,
            Name = "abc",
            Password = "1",
            PhoneNumber = "7978237226",
            Email = "manas@gmail.com",
            Role = "Admin"
        });

        }
        public DbSet<HospitalManagementSystemWebAPI.Models.booking> booking { get; set; } = default!;
    }
}
