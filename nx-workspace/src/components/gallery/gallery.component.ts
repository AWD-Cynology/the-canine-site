import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from '../../models/dog.model';
import { Vote } from '../../models/vote.model';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css','../../styles.css']
})
export class GalleryComponent implements OnInit {
  
  public data: Dog[] = [];
  public pageSize: number = 10;
  public currentPage: number = 0;

  constructor(private apiService: ApiService) { }

  private fetchData(): void {
    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString())
      .set('order', 'ASC')
      .set('has_breeds', 'true')
      .set('mime_types', 'jpg,png');

    forkJoin({
      photos: this.apiService.getDogs(params),
      votes: this.apiService.getVotes()
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

  public addToFavorites(dog: Dog): void {
    this.apiService.addToFavorites(dog).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public vote(vote: number, dog: Dog): void {
    this.apiService.vote(vote, dog).subscribe({
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
