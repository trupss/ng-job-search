import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) {}

  getJobsList(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>('/jobs');
  }
}
