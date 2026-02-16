using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class RevertGuidToInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fines_Borrowings_BorrowingId1",
                table: "Fines");

            migrationBuilder.DropIndex(
                name: "IX_Fines_BorrowingId1",
                table: "Fines");

            migrationBuilder.DropColumn(
                name: "BorrowingId1",
                table: "Fines");

            migrationBuilder.CreateIndex(
                name: "IX_Fines_BorrowingId",
                table: "Fines",
                column: "BorrowingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fines_Borrowings_BorrowingId",
                table: "Fines",
                column: "BorrowingId",
                principalTable: "Borrowings",
                principalColumn: "BorrowingId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fines_Borrowings_BorrowingId",
                table: "Fines");

            migrationBuilder.DropIndex(
                name: "IX_Fines_BorrowingId",
                table: "Fines");

            migrationBuilder.AddColumn<int>(
                name: "BorrowingId1",
                table: "Fines",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fines_BorrowingId1",
                table: "Fines",
                column: "BorrowingId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Fines_Borrowings_BorrowingId1",
                table: "Fines",
                column: "BorrowingId1",
                principalTable: "Borrowings",
                principalColumn: "BorrowingId");
        }
    }
}
