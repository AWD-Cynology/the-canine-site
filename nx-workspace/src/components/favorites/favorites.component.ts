import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog, FavoriteDog } from '../../models/dog.model';
import { ApiService } from '../../services/api.service';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule, WrapperComponent ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../../styles.css']
})
export class FavoritesComponent implements OnInit {
  public data: FavoriteDog[] = [];
  public isLoading = false;

  public constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getFavoriteDogs()
    .pipe(
      mergeMap((response: FavoriteDog[]) => {
        const dogRequests = response.map(dog =>
          this.apiService.getDog(dog)
          .pipe(
            catchError(error => {
              console.log(error);
              return of(null);
            })
          )
        );
        return forkJoin(dogRequests)
        .pipe(
          map((dogs: (Dog | null)[]) => {
            return response.map((dog, index) => {
                if (dogs[index]) {
                  dog.name = dogs[index]?.breeds[0]?.name ?? "Unknown";
                } else {
                  dog.name = "Unknown";
                }
                
                return dog;
            });
          })
        );
      }),
      catchError(error => {
        console.log(error);
        return of([]);
      })
    ).subscribe((data: FavoriteDog[]) => {
      this.data = data;
      this.isLoading = false;
    });
  }
}
