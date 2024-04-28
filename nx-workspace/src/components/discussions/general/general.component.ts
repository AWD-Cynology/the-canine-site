import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Thread, ThreadDTO } from '../../../models/forum.model'
import { ForumService } from '../../../services/forum.service';
import { WrapperComponent } from '../../wrapper/wrapper.component';

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

  private fetchData() {
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

  public ngOnInit(): void {
    this.fetchData();
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
        next: () => {
          this.fetchData();
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


  public replyToDiscussion(discussion: Thread, textArea: string, areaIndex: number): void {
    // if(textArea.trim() !== ''){
    //   const newReply: Reply = {
    //     username: 'User456', 
    //     timestamp: new Date(),
    //     content: textArea,
    //     replies: []
    //   };
    //   discussion.replies.push(newReply);
    //   this.discussionTextAreas[areaIndex]='';
    // }
  }

  // Function to reply to a discussion
  public replyToReply(replyId: string): void {
    // const newReply: Reply = {
    //   username: 'User456', // Replace with the actual username of the user
    //   timestamp: new Date(),
    //   content: 'Reply to reply content',
    //   replies: []
    // };
    // Here you might want to add the new reply to the specific reply being replied to.
    // For example, you could have a nested structure to represent replies to replies.
    // For simplicity, let's assume a flat structure for now:
    // reply.replies.push(newReply);
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
