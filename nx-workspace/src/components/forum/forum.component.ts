import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumTopic } from '../../models/forum.model';
import { DiscussionComponent } from '../discussion/discussion.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ CommonModule, DiscussionComponent ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css', '../../styles.css']
})
export class ForumComponent {
  public forumCategories: ForumTopic[] = [
    { callerId: "general", name: 'General Discussion', icon: '😊', description: 'Discuss anything related to dogs.', isHovered:false },
    { callerId: "pair", name: 'Find a Pair', icon: '❤️', description: 'Connect with other dog owners to find playmates for your dog.', isHovered:false },
    { callerId: "training", name: 'Dog Training', icon: '🦴', description: 'Share tips and tricks for training dogs.', isHovered:false },
    { callerId: "experiences", name: 'Dog Experiences', icon: '✨', description: 'Share your memorable experiences with dogs.', isHovered:false }
  ];
  public chosenTopic: ForumTopic | null = null;

  public constructor() {}

  public chooseTopic(topic: ForumTopic): void {
    this.chosenTopic = topic;
  }

  public resetChosenTopic(): void {
    this.chosenTopic = null;
  }
}