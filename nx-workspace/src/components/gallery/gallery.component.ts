import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Breed, FavoriteDog } from '../../models/dog.model';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api-service.service';
import { LoadingService } from '../../services/loading.service';

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
  public points: number = 0;

  public constructor(private apiService: ApiService,
    private loadingService: LoadingService) { }

  private fetchData(): void {
    this.loadingService.setLoadingState(true);
    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString());

    forkJoin({
      breeds: this.apiService.getBreeds(params),
      votes: this.apiService.getVotes(),
      favorites: this.apiService.getFavoriteDogs()
    }).subscribe({
      next: ({ breeds, votes, favorites }) => {
        this.loadingService.setLoadingState(true);
        breeds.forEach(x => {
          x.upvotes = 0;
          x.downvotes = 0;
        });
        favorites.forEach(x => {
          let breed = breeds.find(breed => breed.image.id === x.image_id);
          if (breed) {
            breed.isInFavorites = true;
          }
        });
        votes.forEach(vote => {
          let breed = breeds.find(breed => breed.image.id === vote.image_id);
          if (breed) {
            vote.value === 0 ? breed.downvotes++ : breed.upvotes++;
          }
        });
        this.data = breeds;
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error(error);
      }
    });
  }

  public ngOnInit(): void {
    this.fetchData();
    this.points = parseInt(localStorage.getItem('points') || '0', 10);
  }

  public changeFavorite(breed: Breed): void {
    this.loadingService.setLoadingState(true);
    if (breed.isInFavorites) {
      this.apiService.getFavoriteDogs().subscribe({
        next: (favorites: FavoriteDog[]) => {
          this.loadingService.setLoadingState(true);
          let id = favorites.find(x => x.image_id === breed.image.id)?.id;
          this.apiService.removeFavorite(id!).subscribe({
            next: () => {
              breed.isInFavorites = false;
              this.loadingService.setLoadingState(false);
            },
            error: (error) => {
              this.loadingService.setLoadingState(false);
              console.error(error);
            }
          });
        },
        error: (error) => {
          this.loadingService.setLoadingState(false);
          console.error(error);
        }
      });
    }
    else {
      this.apiService.addFavorite(breed.image.id).subscribe({
        next: () => {
          this.loadingService.setLoadingState(true);
          breed.isInFavorites = true;
          this.loadingService.setLoadingState(false);
        },
        error: (error) => {
          this.loadingService.setLoadingState(false);
          console.error(error);
        }
      });
    }
  }

  public vote(vote: number, breed: Breed): void {
    this.loadingService.setLoadingState(true);
    const availablePoints  = parseInt(localStorage.getItem('points') || '0', 10);
    const username = localStorage.getItem('username') || '';

    if (availablePoints <= 0) {
      console.log("You don't have enough points to vote.");
      this.loadingService.setLoadingState(false);
      return;
    }

    this.apiService.vote(vote, breed.image.id, username).subscribe({
      next: () => {
        this.loadingService.setLoadingState(true);
        this.points = Math.max(0, availablePoints - 1)
        localStorage.setItem('points', this.points.toString());

        if (vote === 1) {
          breed.upvotes = (breed.upvotes || 0) + 1;
        } else {
          breed.downvotes = (breed.downvotes || 0) + 1;
        }
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
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
