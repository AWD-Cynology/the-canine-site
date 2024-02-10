import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog, FavoriteDog } from '../../models/dog.model';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../../styles.css']
})
export class FavoritesComponent implements OnInit {
  public data: FavoriteDog[] = [];

  public constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.apiService.getFavoriteDogs().subscribe({
      next: (response: FavoriteDog[]) => {
        for (let dog of response) {
          this.apiService.getDog(dog).subscribe({
            next: (response: Dog) => {
              dog.name = response.breeds[0].name;
              this.data.push(dog);
            },
            error: (error) => {
              console.log(error);
            }
          })
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
