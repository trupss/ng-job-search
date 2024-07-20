import { Component } from '@angular/core';
import { FavoriteJobsService } from '../favorite-jobs.service';
import { Observable, tap} from 'rxjs';
import { Jobs } from '../models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  protected favoriteJobs$!: Observable<Jobs[]>;
  existingEntries: any;
  favoriteJobs: any;

  constructor(
    private favoriteJobsService: FavoriteJobsService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    let existingfavList = this.localStorage.getList("favJobList");
    this.existingEntries = (existingfavList==null)? [] : JSON.parse(existingfavList);
    this.favoriteJobs$ = this.favoriteJobsService.state$.pipe(
      tap(res => res.length===0)
    );
  }
}
