import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TabLink } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ng-job-search';
  tabLinks: TabLink[] = [
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
  activeLinkIndex = -1; 
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeLinkIndex = this.tabLinks.indexOf(this.tabLinks.find(tab => tab.link === '.' + this.router.url) as TabLink);
    });
  }
}
