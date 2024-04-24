using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class ThreadUserUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads");

            migrationBuilder.DropTable(
                name: "RepliesToReplies");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DatePosted",
                table: "Threads",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<string>(
                name: "CynologyUserId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DatePosted",
                table: "Replys",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads",
                column: "CynologyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DatePosted",
                table: "Threads",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "CynologyUserId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DatePosted",
                table: "Replys",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateTable(
                name: "RepliesToReplies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DatePosted = table.Column<DateOnly>(type: "date", nullable: false),
                    ReplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepliesToReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepliesToReplies_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepliesToReplies_UserId",
                table: "RepliesToReplies",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads",
                column: "CynologyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
