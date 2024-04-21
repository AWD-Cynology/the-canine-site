import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed, Dog, FavoriteDog } from '../models/dog.model';
import { Vote } from '../models/vote.model';
import { LoginModel, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });
  private getBreedsUrl = 'https://api.thedogapi.com/v1/breeds/';
  private getDogUrl = 'https://api.thedogapi.com/v1/images/';
  private favoritesUrl = 'https://api.thedogapi.com/v1/favourites/';
  private votesUrl = 'https://api.thedogapi.com/v1/votes/';
  private loginUrl = 'https://localhost:7020/api/CynologyUser/login';

  constructor(private http: HttpClient) { }

  public getBreeds(params: HttpParams): Observable<Breed[]> {
    return this.http.get<Breed[]>(this.getBreedsUrl, { headers: this.headers, params: params });
  }

  public getFavoriteDogs(): Observable<FavoriteDog[]> {
    return this.http.get<FavoriteDog[]>(this.favoritesUrl, { headers: this.headers });
  }

  public addFavorite(imageId: string): Observable<any> {
    return this.http.post<any>(this.favoritesUrl, { "image_id": imageId }, { headers: this.headers });
  }

  public removeFavorite(id: number): Observable<any> {
    return this.http.delete<any>(this.favoritesUrl + id.toString(), { headers: this.headers });
  }

  public getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(this.votesUrl, { headers: this.headers });
  }

  public vote(vote: number, imageId: string, username: string): Observable<any> {
    return this.http.post<any>(this.votesUrl, { "image_id": imageId, "value": vote, "sub_id": username }, { headers: this.headers });
  }

  public getDog(dog: FavoriteDog): Observable<Dog> {
    return this.http.get<Dog>(this.getDogUrl + dog.image_id, { headers: this.headers });
  }

  public login(loginObject: LoginModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.loginUrl, loginObject);
  }
}
