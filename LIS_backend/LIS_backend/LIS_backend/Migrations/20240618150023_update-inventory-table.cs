using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_backend.Migrations
{
    /// <inheritdoc />
    public partial class updateinventorytable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Inventory_Products",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    inventoryId = table.Column<int>(type: "int", nullable: true),
                    productid = table.Column<int>(type: "int", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory_Products", x => x.id);
                    table.ForeignKey(
                        name: "FK_Inventory_Products_Inventories_inventoryId",
                        column: x => x.inventoryId,
                        principalTable: "Inventories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Inventory_Products_Products_productid",
                        column: x => x.productid,
                        principalTable: "Products",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Products_inventoryId",
                table: "Inventory_Products",
                column: "inventoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Products_productid",
                table: "Inventory_Products",
                column: "productid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventory_Products");
        }
    }
}
