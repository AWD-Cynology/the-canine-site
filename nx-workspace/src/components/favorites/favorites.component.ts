import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog, FavoriteDog } from '../../models/dog.model';
import { ApiService } from '../../services/api-service.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../../styles.css']
})
export class FavoritesComponent implements OnInit {
  public data: FavoriteDog[] = [];

  public constructor(private apiService: ApiService,
    private loadingService: LoadingService) { }

  public ngOnInit(): void {
    this.loadingService.setLoadingState(true);
    this.apiService.getFavoriteDogs().subscribe({
      next: (response: FavoriteDog[]) => {
        this.loadingService.setLoadingState(true);
        for (let dog of response) {
          this.apiService.getDog(dog).subscribe({
            next: (response: Dog) => {
              dog.name = response.breeds[0].name;
              this.data.push(dog);
              this.loadingService.setLoadingState(false);
            },
            error: (error) => {
              this.loadingService.setLoadingState(false);
              console.log(error);
            }
          })
        }
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.log(error);
      }
    });
  }
}
