import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../models/dog.model';
import { Vote } from '../../models/vote.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css','../../styles.css']
})
export class GalleryComponent implements OnInit {
  private getPhotosUrl = 'https://api.thedogapi.com/v1/images/search?page=0&limit=100&order=ASC&has_breeds=true';
  private addToFavoritesUrl = 'https://api.thedogapi.com/v1/favourites';
  private votesUrl = 'https://api.thedogapi.com/v1/votes';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });
  
  public data: Dog[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    forkJoin({
      photos: this.http.get<Dog[]>(this.getPhotosUrl, { headers: this.headers }),
      votes: this.http.get<Vote[]>(this.votesUrl, { headers: this.headers })
    }).subscribe({
      next: ({ photos, votes }) => {
        this.data = photos;
        votes.forEach(vote => {
          let dog = this.data.find(dog => dog.id === vote.image_id);
          if (dog) {
            vote.value === 0 ? dog.downvotes++ : dog.upvotes++;
          }
        });
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
    this.http.post(this.addToFavoritesUrl, { "image_id": dog.id }, { headers: this.headers }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public vote(vote: number, dog: any): void {
    this.http.post(this.votesUrl, { "image_id": dog.id, "value": vote }, { headers: this.headers }).subscribe({
      next: () => {
        if (vote === 1) {
          dog.upvotes = (dog.upvotes || 0) + 1;
        } else {
          dog.downvotes = (dog.downvotes || 0) + 1;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
