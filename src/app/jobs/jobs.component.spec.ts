import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from '../service/local-storage.service';
import { FavoriteJobsService } from '../service/favorite-jobs.service';
import { JobsService } from '../service/jobs.service';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  const mockLocalStorageService: LocalStorageService = jasmine.createSpyObj('LocalStorageService', ['setList', 'getList', 'removeList']);
  const mockFavoriteJobsService: FavoriteJobsService = jasmine.createSpyObj('FavoriteJobsService', ['setFavoriteJobs']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsComponent, HttpClientTestingModule],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: FavoriteJobsService, useValue: mockFavoriteJobsService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addToFav', () => {
    // Arrange
    const job = {
      id: 98596,
      companyName: "Kraken",
      title: "Live Support Specialist - Mexico",
      companyLogo: "https://interstate21.com/job-search-app/Kraken.png",
      reference: "98596-live-support-specialist-mexico",
    }
    const setlocalStorageSpy = (mockLocalStorageService.setList as jasmine.Spy).and.callFake(() => {});
    const setFavoriteJobsSpy = (mockFavoriteJobsService.setFavoriteJobs as jasmine.Spy).and.callFake(() => {});

    // Act
    component.addToFav(job, 98596, [98598,98599]);
    // Assert
    expect(component.favoriteJobs.length).toEqual(1);
    expect(setlocalStorageSpy).toHaveBeenCalled();
    expect(setFavoriteJobsSpy).toHaveBeenCalled();
  });

  it('should removeFav', () => {
    // Arrange
    const setlocalStorageSpy = (mockLocalStorageService.setList as jasmine.Spy).and.callFake(() => {});
    const setFavoriteJobsSpy = (mockFavoriteJobsService.setFavoriteJobs as jasmine.Spy).and.callFake(() => {});

    // Act
    component.removeFav(98596, [98596,98596]);
    // Assert
    expect(component.favoriteJobs.length).toEqual(0);
    expect(setlocalStorageSpy).toHaveBeenCalled();
    expect(setFavoriteJobsSpy).toHaveBeenCalled();
  });

  it('should call addToFav() when Inactive star Icon is clicked', () => {
    // Arrange
    component.active[1]=false;
    const job = {
      id: 98596,
      companyName: "Kraken",
      title: "Live Support Specialist - Mexico",
      companyLogo: "https://interstate21.com/job-search-app/Kraken.png",
      reference: "98596-live-support-specialist-mexico",
    }
    const addToFavSpy = spyOn(component, 'addToFav').and.callThrough();

    // Act
    component.toggleIcon(job, 98596, 1);
    // Assert
    expect(addToFavSpy).toHaveBeenCalled();
  });

  it('should call removeFav() when active star Icon is clicked', () => {
    // Arrange
    component.active[1]=true;
    const job = {
      id: 98596,
      companyName: "Kraken",
      title: "Live Support Specialist - Mexico",
      companyLogo: "https://interstate21.com/job-search-app/Kraken.png",
      reference: "98596-live-support-specialist-mexico",
    }
    const removeFavSpy = spyOn(component, 'removeFav').and.callThrough();

    // Act
    component.toggleIcon(job, 98596, 1);
    // Assert
    expect(removeFavSpy).toHaveBeenCalled();
  });
});
