import { Component, OnInit } from '@angular/core';
import { FavoriteJobsService } from '../service/favorite-jobs.service';
import { map, Observable, of, switchMap, tap} from 'rxjs';
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
  newJobsList$!: Observable<Jobs[]>;

  constructor(
    private favoriteJobsService: FavoriteJobsService,
    private localStorage: LocalStorageService,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    let existingfavList = this.localStorage.getList("favJobList");
    this.existingEntries = (existingfavList==null)? [] : JSON.parse(existingfavList);

    // this.favoriteJobs$ = this.favoriteJobsService.state$;
    // if(!this.favoriteJobs$) {
    //   this.favoriteJobs$ = this.jobsService.getJobsList().pipe(
    //     map((jl) => {
    //       jl.forEach((obj) => {
    //         if(this.existingEntries.length!==0 && this.existingEntries.indexOf(obj.id) !== -1){
    //           this.favoriteJobs.push(obj);
    //         }
    //       })
    //       return this.favoriteJobs;
    //     })
    //   )
    // }
  
    this.favoriteJobs$ = this.favoriteJobsService.state$.pipe(
      tap(()=>console.log),
      switchMap((result) => {
        if (result !== null) {
          // First observable has emitted, do something with the result
          return of(result);
        } else {
          // First observable hasn't emitted, switch to the second observable
          return this.jobsService.getJobsList().pipe(
            map((jl) => {
              jl.forEach((obj) => {
                if(this.existingEntries.length!==0 && this.existingEntries.indexOf(obj.id) !== -1){
                  this.favoriteJobs.push(obj);
                }
              })
              return this.favoriteJobs;
            })
          )
        }
      }));

    // this.favoriteJobs$ = this.favoriteJobsService.state$.pipe(
    //   filter((val) => !!val),
    //   switchMap((result) => {
    //     return of(result);
    //   }),
    //   filter((val) => !val),
    //   switchMap((result) => {
    //     return this.jobsService.getJobsList().pipe(
    //       map((jl) => {
    //         jl.forEach((obj) => {
    //           if(this.existingEntries.length!==0 && this.existingEntries.indexOf(obj.id) !== -1){
    //             this.favoriteJobs.push(obj);
    //           }
    //         })
    //         return this.favoriteJobs;
    //       })
    //     );
    //   }),
    //   );
    
}
}
