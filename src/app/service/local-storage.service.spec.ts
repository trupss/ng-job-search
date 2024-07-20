import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setList in Local storage', () => {
    // Arrange
    const localStorageSpy = spyOn(localStorage, 'setItem');
    
    // Act
    service.setList('key', 'value')
    
    // Assert
    expect(localStorageSpy).toHaveBeenCalledWith('key', 'value');
  });
});
