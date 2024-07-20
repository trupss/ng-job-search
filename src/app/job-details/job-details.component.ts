import { Component } from '@angular/core';
import { JobDetailsService } from '../service/job-details.service';
import { Observable } from 'rxjs/internal/Observable';
import { JobDetails } from '../models';
import { AsyncPipe, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetails$!: Observable<JobDetails>;

  constructor(
    private jobDetailsService: JobDetailsService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobDetails$ = this.jobDetailsService.getJobDetails(id);
  }

  goBack() {
    this.location.back();
  }

}
