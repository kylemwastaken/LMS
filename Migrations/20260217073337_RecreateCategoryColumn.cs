using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class RecreateCategoryColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                 name: "Category",
                 table: "Books",
                 type: "nvarchar(max)",
                 nullable: false,
                 defaultValue: "Academic");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
             name: "Category",
             table: "Books");

            migrationBuilder.AddColumn<string>(
              name: "Category",
              table: "Books",
              type: "nvarchar(max)",
              nullable: true);


        }
    }
}
