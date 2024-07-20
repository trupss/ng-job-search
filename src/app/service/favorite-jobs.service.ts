import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Jobs } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobsService {
  private state = new ReplaySubject<Jobs[]>(1);
  public state$ = this.state.asObservable();

  constructor() { }

  setFavoriteJobs(data: Jobs[]): void {
    this.state.next(data);
  }
}
