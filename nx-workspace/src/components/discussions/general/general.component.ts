import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Thread, Reply, ThreadDTO, ReplyDTO } from '../../../models/forum.model'
import { ApiService } from '../../../services/api.service';
import { error } from 'console';
import { JwtInterceptor } from '../../../services/jwt-interceptor';

@Component({
  selector: 'app-general-forum',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  providers: [ DatePipe ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css', '../../../styles.css']
})
export class GeneralForumComponent implements OnInit{

  threads: Thread[] = [];
  newThreadContent: string = '';
  newThreadTitle: string = '';
  discussionTextAreas: string[] = [];

  constructor(private apiService: ApiService, private datePipe: DatePipe){}

  fetchData(){
    forkJoin({
      threads: this.apiService.getThreadsForTopic(new HttpParams().set('topicId', "general"))
    }).subscribe({
      next: ({ threads }) =>{this.threads = threads},
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  startDiscussion(): void {
    if (this.newThreadContent.trim() !== '') {
      const newThread: ThreadDTO = {
        topicId: "general",
        title: this.newThreadTitle,
        text: this.newThreadContent,
        datePosted: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss') as string,
      };

      this.apiService.postNewThread(newThread).subscribe({
        next: ({}) => {this.fetchData()},
        error: (error) => {
          console.error(error);
        }
      });
      
      this.newThreadContent = '';
      this.newThreadTitle = '';
    }
  }


  replyToDiscussion(discussion: Thread, textArea: string, areaIndex: number): void {
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
  replyToReply(replyId: string): void {
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

// interface Discussion {
//   username: string;
//   timestamp: Date;
//   content: string;
//   replies: Reply[];
// }

// interface Reply {
//   username: string;
//   timestamp: Date;
//   content: string;
//   replies: Reply[];
// }
