import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new Subject<boolean>();
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {}

  public setLoadingState(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
}
