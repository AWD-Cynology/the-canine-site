using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class testMigForNewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RepliesToReply",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepliesToReply", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Thread",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CynologyUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thread", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Thread_AspNetUsers_CynologyUserId",
                        column: x => x.CynologyUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reply",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reply", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reply_Thread_ThreadId",
                        column: x => x.ThreadId,
                        principalTable: "Thread",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                        name: "FK_RepliesToReplyReply_RepliesToReply_RepliesId",
                        column: x => x.RepliesId,
                        principalTable: "RepliesToReply",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RepliesToReplyReply_Reply_repliesToReplyId",
                        column: x => x.repliesToReplyId,
                        principalTable: "Reply",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepliesToReplyReply_repliesToReplyId",
                table: "RepliesToReplyReply",
                column: "repliesToReplyId");

            migrationBuilder.CreateIndex(
                name: "IX_Reply_ThreadId",
                table: "Reply",
                column: "ThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_Thread_CynologyUserId",
                table: "Thread",
                column: "CynologyUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepliesToReplyReply");

            migrationBuilder.DropTable(
                name: "RepliesToReply");

            migrationBuilder.DropTable(
                name: "Reply");

            migrationBuilder.DropTable(
                name: "Thread");
        }
    }
}
