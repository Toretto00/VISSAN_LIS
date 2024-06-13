using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIS_API.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    code = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "StoreLocations",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    warehouseID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    storeID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    retailSystem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shortname = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreLocations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    categoryid = table.Column<int>(type: "int", nullable: true),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_categoryid",
                        column: x => x.categoryid,
                        principalTable: "Categories",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    userid = table.Column<int>(type: "int", nullable: true),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoices_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "User_Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userid = table.Column<int>(type: "int", nullable: true),
                    storeLocationid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Locations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Locations_StoreLocations_storeLocationid",
                        column: x => x.storeLocationid,
                        principalTable: "StoreLocations",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_User_Locations_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    locationid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    productid = table.Column<int>(type: "int", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventories_Products_productid",
                        column: x => x.productid,
                        principalTable: "Products",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Inventories_StoreLocations_locationid",
                        column: x => x.locationid,
                        principalTable: "StoreLocations",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Invoice_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userid = table.Column<int>(type: "int", nullable: true),
                    invoiceId = table.Column<int>(type: "int", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    created = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoice_Products_Invoices_invoiceId",
                        column: x => x.invoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Invoice_Products_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_locationid",
                table: "Inventories",
                column: "locationid");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_productid",
                table: "Inventories",
                column: "productid");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_Products_invoiceId",
                table: "Invoice_Products",
                column: "invoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_Products_userid",
                table: "Invoice_Products",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_userid",
                table: "Invoices",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_Products_categoryid",
                table: "Products",
                column: "categoryid");

            migrationBuilder.CreateIndex(
                name: "IX_User_Locations_storeLocationid",
                table: "User_Locations",
                column: "storeLocationid");

            migrationBuilder.CreateIndex(
                name: "IX_User_Locations_userid",
                table: "User_Locations",
                column: "userid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "Invoice_Products");

            migrationBuilder.DropTable(
                name: "User_Locations");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "StoreLocations");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
