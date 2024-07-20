import { TestBed } from '@angular/core/testing';

import { FavoriteJobsService } from './favorite-jobs.service';
import { Subject } from 'rxjs';

describe('FavoriteJobsService', () => {
  let service: FavoriteJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set State$ with ', () => {
    // Arrange
    const FAV_JOB_LIST = [
      {
        id: 98596,
        companyName: "Kraken",
        title: "Live Support Specialist - Mexico",
        companyLogo: "https://interstate21.com/job-search-app/Kraken.png",
        reference: "98596-live-support-specialist-mexico",
      },
      {
        id: 75278,
        companyName: "Scroll.io",
        title: "People Operations Manager (Chinese / English)",
        companyLogo: "https://interstate21.com/job-search-app/scroll-io.jpg",
        reference: "75278-people-operations-specialist-chinese-and-english",
      }]
      

    // Act
    service.setFavoriteJobs(FAV_JOB_LIST);

    // Assert
    service.state$.subscribe((res) => {
      expect(res.length).toEqual(2);
    })
  });
  
});
