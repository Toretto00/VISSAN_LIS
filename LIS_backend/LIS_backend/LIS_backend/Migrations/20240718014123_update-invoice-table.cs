using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_backend.Migrations
{
    /// <inheritdoc />
    public partial class updateinvoicetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "locationid",
                table: "Invoices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_locationid",
                table: "Invoices",
                column: "locationid");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_StoreLocation_locationid",
                table: "Invoices",
                column: "locationid",
                principalTable: "StoreLocation",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_StoreLocation_locationid",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_locationid",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "locationid",
                table: "Invoices");
        }
    }
}
