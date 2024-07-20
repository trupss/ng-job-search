import { Component, OnInit } from '@angular/core';
import { JobsService } from '../service/jobs.service';
import { Observable, tap } from 'rxjs';
import { Jobs } from '../models';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../service/local-storage.service';
import { FavoriteJobsService } from '../service/favorite-jobs.service';


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})

export class JobsComponent implements OnInit{
  jobs$!: Observable<Jobs[]>;
  existingEntries: number[]=[];
  favoriteJobs: Jobs[] = [];
  toggle: boolean = false;
  active = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 

  constructor(
    private jobsService: JobsService,
    private localStorage: LocalStorageService,
    private favoriteJobsService: FavoriteJobsService 
  ) {}
  
  ngOnInit() {
    let existingfavList = this.localStorage.getList("favJobList");
    this.existingEntries = (existingfavList==null)? [] : JSON.parse(existingfavList);
    this.jobs$ = this.jobsService.getJobsList().pipe(
      tap((res) => {
        res.forEach((obj,i) => {
          if (this.existingEntries.length!==0 && this.existingEntries.indexOf(obj.id) !== -1) {
            this.active[i] = true;
            this.favoriteJobs.push(obj);
          }
        });
      }),
      tap(() => this.favoriteJobsService.setFavoriteJobs(this.favoriteJobs))
    );
  }

  toggleIcon(obj: Jobs, jobID: number, i: number) {
    this.active[i] = !this.active[i];
    if(this.active[i]===true) {
      this.addToFav(obj, jobID, this.existingEntries);
    }
    if(this.active[i]===false) {
      this.removeFav(jobID, this.existingEntries);
    }
  }

  addToFav(obj: Jobs, id: number, existingEntries: number[]){
    this.favoriteJobs.push(obj);
    existingEntries.push(id);
    let uniqueIds = existingEntries.filter((v,i,a)=>a.indexOf(v)==i);
    this.localStorage.setList("favJobList", JSON.stringify(uniqueIds));
    this.favoriteJobsService.setFavoriteJobs(this.favoriteJobs);
  }

  removeFav(id: number, existingEntries: number[]) {
    this.favoriteJobs = this.favoriteJobs.filter((obj) => obj.id !==id);
    this.existingEntries = existingEntries.filter((e) => e !==id);
    this.localStorage.setList("favJobList", JSON.stringify(this.existingEntries));
    this.favoriteJobsService.setFavoriteJobs(this.favoriteJobs);
  }
}
