import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.updateTicker();
      setInterval(() => this.updateTicker(), 30000); // update ticker-data every 30 seconds  
   }
  }

  updateTicker(): void {
    const tickerContent = document.getElementById('ticker-content');
    if (tickerContent) {
      tickerContent.innerHTML = '';

      // Sample dog votes data
      const dogVotes = [
        { name: 'DogName1', upvotes: 30, downvotes: 15 },
        { name: 'DogName2', upvotes: 50, downvotes: 30 },
        { name: 'DogName3', upvotes: 13, downvotes: 45 },
        { name: 'DogName4', upvotes: 60, downvotes: 11 },
        // Add more dog data as needed  //fill this up with data from api
      ];

      // Generate content for each dog
      dogVotes.forEach(dog => {
        const dogElement = this.renderer.createElement('span');
        this.renderer.setProperty(dogElement, 'textContent', ` | ${dog.name}: Upvotes ${dog.upvotes}, Downvotes ${dog.downvotes} | `);
        this.renderer.appendChild(tickerContent, dogElement);
      });
    } else {
      console.error('Ticker content element not found.');
    }
  }

  redirectToGallery(): void {
    this.router.navigate(['/gallery']);
  }
}
