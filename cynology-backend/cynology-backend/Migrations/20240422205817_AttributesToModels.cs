using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class AttributesToModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DatePosted",
                table: "Thread",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Thread",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Thread",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DatePosted",
                table: "Reply",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Reply",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Reply",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateOnly>(
                name: "DatePosted",
                table: "RepliesToReply",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "RepliesToReply",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RepliesToReply",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_RepliesToReply_UserId",
                table: "RepliesToReply",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReply_AspNetUsers_UserId",
                table: "RepliesToReply",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReply_AspNetUsers_UserId",
                table: "RepliesToReply");

            migrationBuilder.DropIndex(
                name: "IX_RepliesToReply_UserId",
                table: "RepliesToReply");

            migrationBuilder.DropColumn(
                name: "DatePosted",
                table: "Thread");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Thread");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Thread");

            migrationBuilder.DropColumn(
                name: "DatePosted",
                table: "Reply");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Reply");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Reply");

            migrationBuilder.DropColumn(
                name: "DatePosted",
                table: "RepliesToReply");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "RepliesToReply");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RepliesToReply");
        }
    }
}
