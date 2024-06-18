using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_backend.Migrations
{
    /// <inheritdoc />
    public partial class updateinventory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Products_productid",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_productid",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "productid",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "Inventories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "productid",
                table: "Inventories",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "Inventories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_productid",
                table: "Inventories",
                column: "productid");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Products_productid",
                table: "Inventories",
                column: "productid",
                principalTable: "Products",
                principalColumn: "id");
        }
    }
}
