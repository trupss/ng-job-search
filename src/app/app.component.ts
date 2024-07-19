import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search';
  tabLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router) {
    this.tabLinks = [
        {
          index: 0,
          name: 'JOBS',
          link: './jobs',
        }, {
          index: 1,
          name: 'FAVORITES',
          link: './favourites',
        }
    ];
}
ngOnInit(): void {
  this.router.events.subscribe(() => {
      this.activeLinkIndex = this.tabLinks.indexOf(this.tabLinks.find(tab => tab.link === '.' + this.router.url));
  });
}
}
