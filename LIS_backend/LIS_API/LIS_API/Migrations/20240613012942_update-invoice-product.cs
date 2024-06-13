using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_API.Migrations
{
    /// <inheritdoc />
    public partial class updateinvoiceproduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Products_Users_userid",
                table: "Invoice_Products");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "Invoice_Products",
                newName: "productid");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_Products_userid",
                table: "Invoice_Products",
                newName: "IX_Invoice_Products_productid");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Products_Products_productid",
                table: "Invoice_Products",
                column: "productid",
                principalTable: "Products",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Products_Products_productid",
                table: "Invoice_Products");

            migrationBuilder.RenameColumn(
                name: "productid",
                table: "Invoice_Products",
                newName: "userid");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_Products_productid",
                table: "Invoice_Products",
                newName: "IX_Invoice_Products_userid");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Products_Users_userid",
                table: "Invoice_Products",
                column: "userid",
                principalTable: "Users",
                principalColumn: "id");
        }
    }
}
