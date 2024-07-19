import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Jobs } from './models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobsService {
  private state:Subject<Jobs[]> = new Subject();
  constructor() { }

  setFavoriteJobs(data: Jobs[]): void {
    this.state.next(data);
  }

  getFavoriteJobs(): Observable<Jobs[]> {
    return this.state;
  } 
}
