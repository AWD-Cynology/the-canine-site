import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css','../../styles.css']
})
export class GalleryComponent implements OnInit {
  private getPhotosUrl = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10';
  private addToFavoritesUrl = 'https://api.thedogapi.com/v1/favourites';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });
  
  public data = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.getPhotosUrl, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.data = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public displayDetails(dog: any): void {
    console.log(dog);
  }

  public addToFavorites(dog: any): void {
    this.http.post(this.addToFavoritesUrl, { "image_id": dog['id'] }, { headers: this.headers }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
