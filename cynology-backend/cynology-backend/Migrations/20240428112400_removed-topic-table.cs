using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class removedtopictable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopicId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "Threads");

            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "Threads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "Threads");

            migrationBuilder.AddColumn<string>(
                name: "TopicId",
                table: "Threads",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    callerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TopicName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.callerId);
                });

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
    }
}
