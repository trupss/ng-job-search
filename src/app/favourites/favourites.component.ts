import { Component, OnInit } from '@angular/core';
import { FavoriteJobsService } from '../service/favorite-jobs.service';
import { map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import { Jobs } from '../models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LocalStorageService } from '../service/local-storage.service';
import { JobsService } from '../service/jobs.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{
  protected favoriteJobs$!: Observable<Jobs[]>;
  existingEntries: number[]=[];
  favoriteJobs: Jobs[] = [];
  jobsList$!: Observable<Jobs[]>;
  idSet:number[] = [];

  constructor(
    private favoriteJobsService: FavoriteJobsService,
    private localStorage: LocalStorageService,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    let existingfavList = this.localStorage.getList("favJobList");
    this.existingEntries = (existingfavList==null)? [] : JSON.parse(existingfavList);
  
    this.favoriteJobs$ = this.favoriteJobsService.state$.pipe(
      startWith([]),
      switchMap((result) => {
        if (result.length !== 0) {
          // First observable has emitted, do something with the result
          return of(result);
        } else {
          // First observable hasn't emitted, switch to the second observable
          return this.jobsService.getJobsList().pipe(
            map((jl) => {
              jl.forEach((obj) => {
                if(this.existingEntries.length!==0 && this.existingEntries.indexOf(obj.id) !== -1){
                  if(!this.idSet.includes(obj.id)){
                    this.favoriteJobs.push(obj);
                    this.idSet.push(obj.id)
                  }
                 
                }
              })
              return this.favoriteJobs;
            })
          )
        }
      }));
    
}
}
