import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private getPhotosUrl = 'https://api.thedogapi.com/v1/images/search';
  private addToFavoritesUrl = 'https://api.thedogapi.com/v1/favourites';
  private votesUrl = 'https://api.thedogapi.com/v1/votes';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });
  
  public data: Dog[] = [];
  public pageSize: number = 10;
  public currentPage: number = 0;

  constructor(private http: HttpClient) { }

  private fetchData(): void {
    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString())
      .set('order', 'ASC')
      .set('has_breeds', 'true');

    forkJoin({
      photos: this.http.get<Dog[]>(this.getPhotosUrl, { headers: this.headers, params: params }),
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

  public ngOnInit(): void {
    this.fetchData();
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

  public nextPage(): void {
    this.currentPage++;
    this.fetchData();
  }

  public previousPage(): void {
    this.currentPage--;
    this.fetchData();
  }

  public firstPage(): void {
    this.currentPage = 0;
    this.fetchData();
  }

  public lastPage(): void {
    this.currentPage = 15;
    this.fetchData();
  }
}
