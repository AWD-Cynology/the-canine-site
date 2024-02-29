import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css', '../../styles.css']
})
export class ForumComponent {
  forumCategories = [
    { name: 'General Discussion', icon: '😊', description: 'Discuss anything related to dogs.', isHovered:false },
    { name: 'Find a Pair', icon: '❤️', description: 'Connect with other dog owners to find playmates for your dog.', isHovered:false },
    { name: 'Dog Training', icon: '🦴', description: 'Share tips and tricks for training dogs.', isHovered:false },
    { name: 'Dog Experiences', icon: '✨', description: 'Share your memorable experiences with dogs.', isHovered:false }
  ];

  constructor(private router: Router) {}

  goToDiscussionPage(category: any): void {
    this.router.navigate(['/discussion', category.name]);
  }
}