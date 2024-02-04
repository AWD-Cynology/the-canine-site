import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public picUrl: string | undefined;
  constructor(private http: HttpClient) {
    const url = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
    
    const apiKey = 'live_FJaduOjImMV3tzhbdWv6uwu8wUcpmTbk21SOtn2KjMKfeSHuaROr4V4Px5M3ndYk'; 
    
    const headers = new HttpHeaders({
      'x-api-key': apiKey
    });

    this.http.get(url, { headers }).subscribe((response: any) => {
      this.picUrl = response[0].url;
    }, (error) => {
      console.error('Error fetching dog image:', error);
    });
  }

  public refresh(): void{
    window.location.reload();
  }
}
