import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Breed } from '../../models/dog.model';
import { ApiService } from '../../services/api.service';
import { shuffle } from 'lodash';
import { LoadingService } from '../../services/loading.service';

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
  public pageSize: number = 172;
  public currentPage: number = 0;
  public points: number = 0;
  public guesses: number = 3;

  public constructor(private apiService: ApiService,
    private loadingService: LoadingService) { }

  private resetGuess(): void {
    this.message = '';
    this.guessedRight = false;
    this.guesses = 3;
  }

  private setRandomDog(dogs: Breed[]): void {
    const shuffledArray = shuffle(dogs);
    this.data = shuffledArray.slice(0, 4);
    this.breedToGuess = this.data[Math.floor(Math.random() * this.data.length)];
    this.resetGuess();
  }

  private fetchData(): void {
    this.loadingService.setLoadingState(true);
    let params = new HttpParams()
    .set('limit', this.pageSize.toString())
    .set('page', this.currentPage.toString());

    this.apiService.getBreeds(params).subscribe({
      next: (response: Breed[]) => {
        this.loadingService.setLoadingState(true);
        this.setRandomDog(response);
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error(error);
      }
    });
  }
  
  public ngOnInit(): void {
    this.loadingService.setLoadingState(true);
    const pointsString = localStorage.getItem('points');
    if (pointsString === null || pointsString === undefined) {
      localStorage.setItem('points', '0');
    }
    else {
      this.points = parseInt(pointsString, 10);
    }
    this.fetchData();
  }

  public takeAGuess(dogName: string): void {
    if (dogName === this.breedToGuess.name){
      this.message = 'You guessed right.';
      this.guessedRight = true;

      const pointsString = localStorage.getItem('points');
      if (pointsString !== null && pointsString !== undefined) {
        this.points = parseInt(pointsString, 10);
        this.points = (this.points <= 0) ? Math.max(0, this.guesses) : this.points + this.guesses;
        localStorage.setItem('points', this.points.toString());
      }
      this.fetchData();
    }
    else {
      this.message = 'You guessed wrong, guess again.';
      this.guessedRight = false;
      if( this.guesses > -1 && --this.guesses == 0) {
        this.guesses =- 1;
      }
    }
  }
}
