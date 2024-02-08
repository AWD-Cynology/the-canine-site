import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  public data = [];

  public constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.http.get(this.url, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.data = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
