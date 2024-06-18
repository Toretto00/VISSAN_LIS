using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_API.Migrations
{
    /// <inheritdoc />
    public partial class droptablestorelocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreLocations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StoreLocations",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailSystem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shortname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    storeID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    warehouseID = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreLocations", x => x.id);
                });
        }
    }
}
