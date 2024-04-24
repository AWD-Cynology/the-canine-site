using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class AlterTopicId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Topic",
                table: "Topic");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopicId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Topic");

            migrationBuilder.AddColumn<string>(
                name: "callerId",
                table: "Topic",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TopiccallerId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topic",
                table: "Topic",
                column: "callerId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopiccallerId",
                table: "Threads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Topic",
                table: "Topic");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopiccallerId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "callerId",
                table: "Topic");

            migrationBuilder.DropColumn(
                name: "TopiccallerId",
                table: "Threads");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Topic",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topic",
                table: "Topic",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_TopicId",
                table: "Threads",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
