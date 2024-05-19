import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed, Dog, FavoriteDog } from '../models/dog.model';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
  });
  private apiUrl = 'https://api.thedogapi.com/v1';

  public constructor(private http: HttpClient) { }
  
  public getBreeds(params: HttpParams): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/breeds`, { headers: this.headers, params: params });
  }

  public getFavoriteDogs(): Observable<FavoriteDog[]> {
    return this.http.get<FavoriteDog[]>(`${this.apiUrl}/favourites`, { headers: this.headers });
  }

  public addFavorite(imageId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favourites`, { "image_id": imageId }, { headers: this.headers });
  }

  public removeFavorite(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/favourites/${id}`, { headers: this.headers });
  }

  public getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/votes`, { headers: this.headers });
  }

  public vote(vote: number, imageId: string, username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/votes`, { "image_id": imageId, "value": vote, "sub_id": username }, { headers: this.headers });
  }

  public getDog(dog: FavoriteDog): Observable<Dog> {
    return this.http.get<Dog>(`${this.apiUrl}/images/${dog.image.id}`, { headers: this.headers });
  }
}
