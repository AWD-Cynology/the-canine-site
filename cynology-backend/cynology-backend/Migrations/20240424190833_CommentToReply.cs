using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class CommentToReply : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepliesToReplyReply");

            migrationBuilder.AddColumn<Guid>(
                name: "CommentToReply",
                table: "Replys",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentToReply",
                table: "Replys");

            migrationBuilder.CreateTable(
                name: "RepliesToReplyReply",
                columns: table => new
                {
                    RepliesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    repliesToReplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepliesToReplyReply", x => new { x.RepliesId, x.repliesToReplyId });
                    table.ForeignKey(
                        name: "FK_RepliesToReplyReply_RepliesToReplies_RepliesId",
                        column: x => x.RepliesId,
                        principalTable: "RepliesToReplies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RepliesToReplyReply_Replys_repliesToReplyId",
                        column: x => x.repliesToReplyId,
                        principalTable: "Replys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepliesToReplyReply_repliesToReplyId",
                table: "RepliesToReplyReply",
                column: "repliesToReplyId");
        }
    }
}
