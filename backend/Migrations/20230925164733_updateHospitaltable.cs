using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HospitalManagementSystemWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateHospitaltable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.InsertData(
                table: "Hospitals",
                columns: new[] { "Id", "HospitalName", "HospitalServices" },
                values: new object[,]
                {
                    { 2, "Manipal Hospital", "Cardiology,Orthopedics,Neurology,Obstetrics,Pediatrics,Emergency Care" },
                    { 3, "Jayadeva Hospital", "Orthopedics,Neurology,Pediatrics,Emergency Care" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.InsertData(
                table: "Hospitals",
                columns: new[] { "Id", "HospitalName", "HospitalServices" },
                values: new object[,]
                {
                    { -2, "Jayadeva Hospital", "Orthopedics,Neurology,Pediatrics,Emergency Care" },
                    { -1, "Manipal Hospital", "Cardiology,Orthopedics,Neurology,Obstetrics,Pediatrics,Emergency Care" }
                });
        }
    }
}
