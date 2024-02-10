import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DogModel, FavoriteDog, Image } from '../../responseModels/response.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../../styles.css']
})
export class FavoritesComponent implements OnInit {
  private url = 'https://api.thedogapi.com/v1/favourites';
  private newUrl = 'https://api.thedogapi.com/v1/images/';
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });

  public data: FavoriteDog[] = [];

  public constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.http.get<FavoriteDog[]>(this.url, { headers: this.headers }).subscribe({
      next: (response: FavoriteDog[]) => {
        for (var obj of response){
          this.http.get<DogModel>(this.newUrl + obj.image.id, {headers: this.headers}).subscribe({
            next: (response: DogModel)=>{
              obj.name = response.breeds[0].name;
              this.data.push(obj);
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
