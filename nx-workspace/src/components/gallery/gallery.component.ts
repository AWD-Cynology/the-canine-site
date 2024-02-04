import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  public data = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10';
    const headers = new HttpHeaders({
      'x-api-key': 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'
    });
 
    this.http.get(url, { headers }).subscribe((response: any) => {
      this.data = response
    }, (error) => {
      console.error('Error fetching dog image:', error);
    });
  }

  public displayDetails(dog: any): void {
    console.log(dog);
  }
}
