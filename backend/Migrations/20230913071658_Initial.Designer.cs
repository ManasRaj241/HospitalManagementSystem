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
    [Migration("20230913071658_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

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
                            Id = -1,
                            HospitalName = "Manipal Hospital",
                            HospitalServices = "Cardiology,Orthopedics,Neurology,Obstetrics,Pediatrics,Emergency Care"
                        },
                        new
                        {
                            Id = -2,
                            HospitalName = "Jayadeva Hospital",
                            HospitalServices = "Orthopedics,Neurology,Pediatrics,Emergency Care"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
