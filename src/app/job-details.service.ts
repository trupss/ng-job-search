import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobDetails } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {

  constructor(private http: HttpClient) {}

  getJobDetails(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(`/jobs/${id}`)
  }
}
