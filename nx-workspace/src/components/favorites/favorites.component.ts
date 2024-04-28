import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Dog, FavoriteDog } from '../../models/dog.model';
import { ApiService } from '../../services/api.service';
import { WrapperComponent } from '../wrapper/wrapper.component';

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
    this.apiService.getFavoriteDogs().subscribe({
      next: (response: FavoriteDog[]) => {
        for (let dog of response) {
          this.apiService.getDog(dog).subscribe({
            next: (response: Dog) => {
              dog.name = response.breeds[0].name;
              this.data.push(dog);
            },
            error: (error) => {
              this.isLoading = false;
              console.log(error);
            }
          })
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }
}
