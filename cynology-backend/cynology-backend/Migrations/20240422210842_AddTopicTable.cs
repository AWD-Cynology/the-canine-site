using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cynology_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTopicTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReply_AspNetUsers_UserId",
                table: "RepliesToReply");

            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReplyReply_RepliesToReply_RepliesId",
                table: "RepliesToReplyReply");

            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReplyReply_Reply_repliesToReplyId",
                table: "RepliesToReplyReply");

            migrationBuilder.DropForeignKey(
                name: "FK_Reply_Thread_ThreadId",
                table: "Reply");

            migrationBuilder.DropForeignKey(
                name: "FK_Thread_AspNetUsers_CynologyUserId",
                table: "Thread");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Thread",
                table: "Thread");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reply",
                table: "Reply");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RepliesToReply",
                table: "RepliesToReply");

            migrationBuilder.RenameTable(
                name: "Thread",
                newName: "Threads");

            migrationBuilder.RenameTable(
                name: "Reply",
                newName: "Replys");

            migrationBuilder.RenameTable(
                name: "RepliesToReply",
                newName: "RepliesToReplies");

            migrationBuilder.RenameIndex(
                name: "IX_Thread_CynologyUserId",
                table: "Threads",
                newName: "IX_Threads_CynologyUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reply_ThreadId",
                table: "Replys",
                newName: "IX_Replys_ThreadId");

            migrationBuilder.RenameIndex(
                name: "IX_RepliesToReply_UserId",
                table: "RepliesToReplies",
                newName: "IX_RepliesToReplies_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Threads",
                table: "Threads",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Replys",
                table: "Replys",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RepliesToReplies",
                table: "RepliesToReplies",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Threads_TopicId",
                table: "Threads",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReplies_AspNetUsers_UserId",
                table: "RepliesToReplies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReplyReply_RepliesToReplies_RepliesId",
                table: "RepliesToReplyReply",
                column: "RepliesId",
                principalTable: "RepliesToReplies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReplyReply_Replys_repliesToReplyId",
                table: "RepliesToReplyReply",
                column: "repliesToReplyId",
                principalTable: "Replys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Replys_Threads_ThreadId",
                table: "Replys",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads",
                column: "CynologyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReplies_AspNetUsers_UserId",
                table: "RepliesToReplies");

            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReplyReply_RepliesToReplies_RepliesId",
                table: "RepliesToReplyReply");

            migrationBuilder.DropForeignKey(
                name: "FK_RepliesToReplyReply_Replys_repliesToReplyId",
                table: "RepliesToReplyReply");

            migrationBuilder.DropForeignKey(
                name: "FK_Replys_Threads_ThreadId",
                table: "Replys");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_AspNetUsers_CynologyUserId",
                table: "Threads");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Topic_TopicId",
                table: "Threads");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Threads",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_TopicId",
                table: "Threads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Replys",
                table: "Replys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RepliesToReplies",
                table: "RepliesToReplies");

            migrationBuilder.RenameTable(
                name: "Threads",
                newName: "Thread");

            migrationBuilder.RenameTable(
                name: "Replys",
                newName: "Reply");

            migrationBuilder.RenameTable(
                name: "RepliesToReplies",
                newName: "RepliesToReply");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_CynologyUserId",
                table: "Thread",
                newName: "IX_Thread_CynologyUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Replys_ThreadId",
                table: "Reply",
                newName: "IX_Reply_ThreadId");

            migrationBuilder.RenameIndex(
                name: "IX_RepliesToReplies_UserId",
                table: "RepliesToReply",
                newName: "IX_RepliesToReply_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Thread",
                table: "Thread",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reply",
                table: "Reply",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RepliesToReply",
                table: "RepliesToReply",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReply_AspNetUsers_UserId",
                table: "RepliesToReply",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReplyReply_RepliesToReply_RepliesId",
                table: "RepliesToReplyReply",
                column: "RepliesId",
                principalTable: "RepliesToReply",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RepliesToReplyReply_Reply_repliesToReplyId",
                table: "RepliesToReplyReply",
                column: "repliesToReplyId",
                principalTable: "Reply",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reply_Thread_ThreadId",
                table: "Reply",
                column: "ThreadId",
                principalTable: "Thread",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Thread_AspNetUsers_CynologyUserId",
                table: "Thread",
                column: "CynologyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
