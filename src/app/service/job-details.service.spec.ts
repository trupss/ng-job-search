import { TestBed } from '@angular/core/testing';

import { JobDetailsService } from './job-details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JobDetailsService', () => {
  let service: JobDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(JobDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getJobsList', () => {
    // Arrange

    // Act
    const result = service.getJobDetails(75278);

    // Assert
    expect(service).toBeTruthy();
    result.subscribe((val) => {
      expect(val).toBeDefined();
    })
});

});
