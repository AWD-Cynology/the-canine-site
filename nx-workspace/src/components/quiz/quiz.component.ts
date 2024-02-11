import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../models/dog.model';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', '../../styles.css']
})
export class QuizComponent implements OnInit {
  public data: Dog[] = [];
  public dogToGuess: Dog = new Dog;
  public message = '';

  public constructor(private apiService: ApiService) { }
  
  public ngOnInit(): void {
    let params = new HttpParams()
      .set('limit', '4')
      .set('page', '0')
      .set('order', 'RAND')
      .set('has_breeds', 'true')
      .set('mime_types', 'jpg,png');

    this.apiService.getRandomDogs(params).subscribe({
      next: (response: Dog[]) => {
        this.data = response;
        this.dogToGuess = this.data[Math.floor(Math.random() * this.data.length)];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public takeAGuess(dogName: string): void {
    if (dogName === this.dogToGuess.breeds[0].name){
      this.message = 'You guessed right.';
    }
    else {
      this.message = 'You guessed wrong, guess again.';
    }
  }
}
