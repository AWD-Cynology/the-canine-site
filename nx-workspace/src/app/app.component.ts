import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username: string = "";
  title: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let user = (localStorage.getItem('username') || "");
      ////Can work with or without, depends on need
      // if(user !== this.username){
      //   localStorage.setItem('points', '0');
      // }
      ////
      this.username = user;
    }
    this.title = 'The Canine Site';
  }
}
