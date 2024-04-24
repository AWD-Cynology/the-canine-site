using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class threadFixup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopiccallerId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopiccallerId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "TopiccallerId",
                table: "Threads");

            migrationBuilder.AlterColumn<string>(
                name: "TopicId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_TopicId",
                table: "Threads",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "callerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopicId",
                table: "Threads");

            migrationBuilder.AlterColumn<Guid>(
                name: "TopicId",
                table: "Threads",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "TopiccallerId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Threads_TopiccallerId",
                table: "Threads",
                column: "TopiccallerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Topic_TopiccallerId",
                table: "Threads",
                column: "TopiccallerId",
                principalTable: "Topic",
                principalColumn: "callerId");
        }
    }
}
