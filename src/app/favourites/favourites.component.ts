import { Component } from '@angular/core';
import { FavoriteJobsService } from '../favorite-jobs.service';
import { Observable } from 'rxjs';
import { Jobs } from '../models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  favoriteJobs$!: Observable<Jobs[]>;

  constructor(
    private favoriteJobsService: FavoriteJobsService 
  ) {}

  ngOnInit() {
   this.favoriteJobs$ = this.favoriteJobsService.getFavoriteJobs();
  }
}
