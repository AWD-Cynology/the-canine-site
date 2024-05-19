import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReplyDTO, Thread, ThreadDTO } from '../../../models/forum.model'
import { ForumService } from '../../../services/forum.service';
import { WrapperComponent } from '../../wrapper/wrapper.component';
import { error } from 'node:console';

@Component({
  selector: 'app-general-forum',
  standalone: true,
  imports: [ CommonModule, FormsModule, WrapperComponent ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css', '../../../styles.css']
})
export class GeneralForumComponent implements OnInit {
  public threads: Thread[] = [];
  public newThreadContent: string = '';
  public newThreadTitle: string = '';
  public isLoading = false;

  public constructor(private forumApiService: ForumService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.forumApiService.getThreadsForTopic('general')
    .subscribe({
      next: (threads) => {
        this.threads = threads
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  public newThread(): void {
    this.isLoading = true;
    if (this.newThreadContent.trim() !== '') {
      const newThread: ThreadDTO = {
        topic: "general",
        title: this.newThreadTitle,
        text: this.newThreadContent
      };

      this.forumApiService.newThread(newThread)
      .subscribe({
        next: (thread) => {
          this.threads.push(thread);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
        }
      });
      
      this.newThreadContent = '';
      this.newThreadTitle = '';
    }
  }

  public replyToThread(threadId: string): void {
    this.isLoading = true;
    const reply: ReplyDTO = {
      text: 'this is a reply',
      threadId: threadId
    };

    this.forumApiService.replyToThread(reply)
    .subscribe({
      next: (result) => {
        const thread = this.threads.find(t => t.id === threadId);
        if (thread) {
          thread.replies.push(result);
        }
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  public commentToReply(replyId: string, threadId: string): void {
    const comment: ReplyDTO = {
      threadId: threadId,
      text: 'this is a comment to a reply',
      commentId: replyId
    };
    this.forumApiService.commentToReply(comment)
    .subscribe({
      next: result => {
        this.isLoading = true;
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }
}

interface Discussion {
  username: string;
  timestamp: Date;
  content: string;
  replies: Reply[];
}

interface Reply {
  username: string;
  timestamp: Date;
  content: string;
  replies: Reply[];
}
