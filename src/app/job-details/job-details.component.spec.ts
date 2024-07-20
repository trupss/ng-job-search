import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsComponent } from './job-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JobDetailsService } from '../service/job-details.service';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;

  const mockJobDetailsService: JobDetailsService = jasmine.createSpyObj('JobDetailsService', ['getJobDetails']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailsComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: JobDetailsService, useValue: mockJobDetailsService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call JobDetailsService onInit', () => {
    // Arrange
    const jobDetailsServiceSpy = (mockJobDetailsService.getJobDetails as jasmine.Spy).and.callThrough();

    // Act
   component.ngOnInit();

    // Assert
    expect(jobDetailsServiceSpy).toHaveBeenCalled();
  });
});
