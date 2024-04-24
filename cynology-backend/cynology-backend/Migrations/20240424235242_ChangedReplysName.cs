using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangedReplysName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Replys_Threads_ThreadId",
                table: "Replys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Replys",
                table: "Replys");

            migrationBuilder.RenameTable(
                name: "Replys",
                newName: "Replies");

            migrationBuilder.RenameIndex(
                name: "IX_Replys_ThreadId",
                table: "Replies",
                newName: "IX_Replies_ThreadId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Replies",
                table: "Replies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Replies_Threads_ThreadId",
                table: "Replies",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Replies_Threads_ThreadId",
                table: "Replies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Replies",
                table: "Replies");

            migrationBuilder.RenameTable(
                name: "Replies",
                newName: "Replys");

            migrationBuilder.RenameIndex(
                name: "IX_Replies_ThreadId",
                table: "Replys",
                newName: "IX_Replys_ThreadId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Replys",
                table: "Replys",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Replys_Threads_ThreadId",
                table: "Replys",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
