import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-general-forum',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css', '../../../styles.css']
})
export class GeneralForumComponent {
  discussions: Discussion[] = [];
  newDiscussionContent: string = '';
  discussionTextAreas: string[] = [];

  startDiscussion(): void {
    if (this.newDiscussionContent.trim() !== '') { // Ensure textarea is not empty
      const newDiscussion: Discussion = {
        username: 'User123', 
        timestamp: new Date(),
        content: this.newDiscussionContent, // Assign the content from textarea
        replies: []
      };
      this.discussions.push(newDiscussion);
      // Clear textarea after starting discussion
      this.newDiscussionContent = '';
    }
  }


  replyToDiscussion(discussion: Discussion, textArea: string, areaIndex: number): void {
    if(textArea.trim() !== ''){
      const newReply: Reply = {
        username: 'User456', 
        timestamp: new Date(),
        content: textArea,
        replies: []
      };
      discussion.replies.push(newReply);
      this.discussionTextAreas[areaIndex]='';
    }
  }

  // Function to reply to a discussion
  replyToReply(reply: Reply): void {
    const newReply: Reply = {
      username: 'User456', // Replace with the actual username of the user
      timestamp: new Date(),
      content: 'Reply to reply content',
      replies: []
    };
    // Here you might want to add the new reply to the specific reply being replied to.
    // For example, you could have a nested structure to represent replies to replies.
    // For simplicity, let's assume a flat structure for now:
    reply.replies.push(newReply);
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
