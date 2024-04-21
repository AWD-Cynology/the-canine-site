import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('tickerContent', { static: true }) tickerContent!: ElementRef;
  public pageSize: number = 172;
  public currentPage: number = 0;

  constructor(private router: Router,
    private renderer: Renderer2,
    private apiService: ApiService,
    private loadingService: LoadingService) { }

  public ngOnInit(): void {
    this.loadingService.setLoadingState(true);
    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString());

    this.tickerContent.nativeElement.innerHTML = '';

    forkJoin({
      breeds: this.apiService.getBreeds(params),
      votes: this.apiService.getVotes()
    }).subscribe({
      next: ({ breeds, votes }) => {
        this.loadingService.setLoadingState(true);
        breeds.forEach(x => {
          x.upvotes = 0;
          x.downvotes = 0;
        });
        votes.forEach(vote => {
          let breed = breeds.find(breed => breed.image.id === vote.image_id);
          if (breed) {
            vote.value === 0 ? breed.downvotes++ : breed.upvotes++;
          }
        });
        breeds.forEach(dog => {
          const dogElement = this.renderer.createElement('span');
          this.renderer.setProperty(dogElement, 'textContent', `| ${ dog.name }: Upvotes ${ dog.upvotes }, Downvotes ${ dog.downvotes } |`);
          this.renderer.appendChild(this.tickerContent.nativeElement, dogElement);
        });
        
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error(error);
      }
    });
  }

  redirectToGallery(): void {
    this.router.navigate(['/gallery']);
  }
}
