using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_API.Migrations
{
    /// <inheritdoc />
    public partial class createtablestore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "storeLocation",
                table: "User_Locations");

            migrationBuilder.DropColumn(
                name: "location",
                table: "Inventories");

            migrationBuilder.AddColumn<int>(
                name: "storeLocationid",
                table: "User_Locations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "locationid",
                table: "Inventories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StoreLocation",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    warehouseID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    storeID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailSystem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shortname = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreLocation", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Locations_storeLocationid",
                table: "User_Locations",
                column: "storeLocationid");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_locationid",
                table: "Inventories",
                column: "locationid");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_StoreLocation_locationid",
                table: "Inventories",
                column: "locationid",
                principalTable: "StoreLocation",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Locations_StoreLocation_storeLocationid",
                table: "User_Locations",
                column: "storeLocationid",
                principalTable: "StoreLocation",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_StoreLocation_locationid",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Locations_StoreLocation_storeLocationid",
                table: "User_Locations");

            migrationBuilder.DropTable(
                name: "StoreLocation");

            migrationBuilder.DropIndex(
                name: "IX_User_Locations_storeLocationid",
                table: "User_Locations");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_locationid",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "storeLocationid",
                table: "User_Locations");

            migrationBuilder.DropColumn(
                name: "locationid",
                table: "Inventories");

            migrationBuilder.AddColumn<int>(
                name: "storeLocation",
                table: "User_Locations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "location",
                table: "Inventories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
