import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../models/dog.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', '../../styles.css']
})
export class QuizComponent implements OnInit {
  private url = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=4';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });

  public data: Dog[] = [];
  public dogToGuess: Dog = new Dog;
  public message = '';

  public constructor(private http: HttpClient) { }
  
  public ngOnInit(): void {
    this.http.get<Dog[]>(this.url, { headers: this.headers }).subscribe({
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
