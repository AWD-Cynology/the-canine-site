import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Breed } from '../../models/dog.model';
import { ApiService } from '../../services/api-service.service';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', '../../styles.css']
})
export class QuizComponent implements OnInit {
  public data: Breed[] = [];
  public breedToGuess: Breed = new Breed;
  public message: string = '';
  public guessedRight: boolean = false;

  public constructor(private apiService: ApiService) { }

  private fetchData(): void {
    let params = new HttpParams()
    .set('limit', '172')
    .set('page', '0');

  this.apiService.getBreeds(params).subscribe({
    next: (response: Breed[]) => {
      const shuffledArray = shuffle(response);
      this.data = shuffledArray.slice(0, 4);
      this.breedToGuess = this.data[0];
      this.resetGuess();
    },
    error: (error) => {
      console.error(error);
    }
  });
  }
  
  public ngOnInit(): void {
    this.fetchData();
  }

  public takeAGuess(dogName: string): void {
    if (dogName === this.breedToGuess.name){
      this.message = 'You guessed right.';
      this.guessedRight = true;
      this.fetchData();
    }
    else {
      this.message = 'You guessed wrong, guess again.';
      this.guessedRight = false;
    }
  }

  private resetGuess(): void {
    this.message = '';
    this.guessedRight = false;
  }
}
