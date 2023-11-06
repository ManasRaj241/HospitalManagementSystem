﻿// <auto-generated />
using HospitalManagementSystemWebAPI.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HospitalManagementSystemWebAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231004105423_newGG")]
    partial class newGG
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HospitalManagementSystemWebAPI.Models.Doctors", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("HospitalName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PricePerHour")
                        .HasColumnType("int");

                    b.Property<string>("Specialization")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Doctors");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Age = 23,
                            HospitalName = "Manipal Hospital",
                            IsAvailable = true,
                            Name = "Manas Satapathy",
                            PricePerHour = 20,
                            Specialization = "Neurology"
                        });
                });

            modelBuilder.Entity("HospitalManagementSystemWebAPI.Models.FeedBack", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DoctorName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PatientName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Feedbacks");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DoctorName = "Rakesh Giri",
                            Feedback = "Amazing",
                            PatientName = "Manas Satapathy"
                        });
                });

            modelBuilder.Entity("HospitalManagementSystemWebAPI.Models.Hospital", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("HospitalName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HospitalServices")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Hospitals");

                    b.HasData(
                        new
                        {
                            Id = 2,
                            HospitalName = "Manipal Hospital",
                            HospitalServices = "Cardiology,Orthopedics,Neurology,Obstetrics,Pediatrics,Emergency Care"
                        },
                        new
                        {
                            Id = 3,
                            HospitalName = "Jayadeva Hospital",
                            HospitalServices = "Orthopedics,Neurology,Pediatrics,Emergency Care"
                        });
                });

            modelBuilder.Entity("HospitalManagementSystemWebAPI.Models.UserDetailsOfHMS", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("AppUser");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "manas@gmail.com",
                            Name = "abc",
                            Password = "1",
                            PhoneNumber = "7978237226",
                            Role = "Admin"
                        });
                });

            modelBuilder.Entity("HospitalManagementSystemWebAPI.Models.booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DoctorName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PatientName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("booking");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DoctorName = "Manipal Hospital",
                            PatientName = "Manas Satapathy",
                            Status = "Booked"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
