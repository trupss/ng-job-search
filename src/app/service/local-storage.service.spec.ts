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
    const localStorageSpy = spyOn(Storage.prototype, 'setItem')
    
    // Act
    service.setList('key', 'value')
    
    // Assert
    expect(localStorageSpy).toHaveBeenCalledWith('key', 'value');
  });

  it('should getList in Local storage', () => {
    // Arrange
    const localStorageSpy = spyOn(Storage.prototype, 'getItem')
    
    // Act
    service.getList('key')
    
    // Assert
    expect(localStorageSpy).toHaveBeenCalledWith('key');
  });

  it('should removeList in Local storage', () => {
    // Arrange
    const localStorageSpy = spyOn(Storage.prototype, 'removeItem')
    
    // Act
    service.removeList('key')
    
    // Assert
    expect(localStorageSpy).toHaveBeenCalledWith('key');
  });
});
