import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Breed } from '../../models/dog.model';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css','../../styles.css']
})
export class GalleryComponent implements OnInit {
  public data: Breed[] = [];
  public pageSize: number = 10;
  public currentPage: number = 0;
  public totalPages: number = 18;

  constructor(private apiService: ApiService) { }

  private fetchData(): void {
    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString());

    forkJoin({
      breeds: this.apiService.getBreeds(params),
      votes: this.apiService.getVotes()
    }).subscribe({
      next: ({ breeds, votes }) => {
        votes.forEach(vote => {
          let breed = breeds.find(breed => breed.image.id === vote.image_id);
          if (breed) {
            vote.value === 0 ? breed.downvotes++ : breed.upvotes++;
          }
        });
        this.data = breeds;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public displayDetails(breed: Breed): void {
    console.log(breed);
  }

  public addToFavorites(breed: Breed): void {
    this.apiService.addToFavorites(breed.image.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public vote(vote: number, breed: Breed): void {
    this.apiService.vote(vote, breed.image.id).subscribe({
      next: () => {
        if (vote === 1) {
          breed.upvotes = (breed.upvotes || 0) + 1;
        } else {
          breed.downvotes = (breed.downvotes || 0) + 1;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public goToNextPage(): void {
    this.currentPage++;
    this.fetchData();
  }

  public goToPreviousPage(): void {
    this.currentPage--;
    this.fetchData();
  }

  public goToFirstPage(): void {
    this.currentPage = 0;
    this.fetchData();
  }

  public goToLastPage(): void {
    this.currentPage = this.totalPages - 1;
    this.fetchData();
  }
}
