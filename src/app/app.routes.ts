import { Routes } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobsComponent } from './jobs/jobs.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const routes: Routes = [
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    { path: 'jobs', component: JobsComponent },
    { path: 'job-details/:id', component: JobDetailsComponent },
    { path: 'favourites', component: FavouritesComponent }
];
