import { Component } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Observable, pipe, tap } from 'rxjs';
import { Jobs } from '../models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';
import { FavoriteJobsService } from '../favorite-jobs.service';


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})

export class JobsComponent {
  jobs$!: Observable<Jobs[]>;
  existingEntries: number[]=[];
  toggle: boolean = false;
  iconColor: any;
  changeColor= [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 

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
            this.changeColor[i] = true;
            let data = [];
            data.push(obj)
            this.favoriteJobsService.setFavoriteJobs(data);
        }
      });
      })
    );
  }

  toggleIcon(jobID: number, i: number) {
    this.changeColor[i] = !this.changeColor[i];
    if(this.changeColor[i]===true) {
      this.addToFav(jobID, this.existingEntries);
    }
    if(this.changeColor[i]===false) {
      this.removeFav(jobID, this.existingEntries);
    }
  }

  addToFav(id: number, existingEntries: number[]){
    existingEntries.push(id);
    let y = existingEntries.filter((v,i,a)=>a.indexOf(v)==i);
    let updateEntries = JSON.stringify(y);
    this.localStorage.setList("favJobList", updateEntries);
  }

  removeFav(id: number, existingEntries: number[]) {
    this.existingEntries = existingEntries.filter((e) => e !==id);
    let updateEntries = JSON.stringify(this.existingEntries);
    this.localStorage.setList("favJobList", updateEntries);
  }
}
