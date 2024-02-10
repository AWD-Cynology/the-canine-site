import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteDog } from '../../models/dog.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../../styles.css']
})
export class FavoritesComponent implements OnInit {
  private url = 'https://api.thedogapi.com/v1/favourites';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });

  public data: FavoriteDog[] = [];

  public constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.http.get<FavoriteDog[]>(this.url, { headers: this.headers }).subscribe({
      next: (response: FavoriteDog[]) => {
        this.data = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
