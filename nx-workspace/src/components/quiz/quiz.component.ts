import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  public data = [];
  public dogToGuess: any;
  public message = '';

  public constructor(private http: HttpClient) { }
  
  public ngOnInit(): void {
    const url = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=4';
    const headers = new HttpHeaders({
      'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
    });
 
    this.http.get(url, { headers }).subscribe((response: any) => {
      this.data = response;
      this.dogToGuess = this.data[Math.floor(Math.random() * this.data.length)];
    }, (error: any) => {
      console.error('Error fetching dog image:', error);
    });
  }

  public takeAGuess(dog: any): void {
    if (dog['breeds'][0]['name'] === this.dogToGuess['breeds'][0]['name']){
      this.message = 'You guessed right.';
    }
    else {
      this.message = 'You guessed wrong, guess again.';
    }
  }
}
