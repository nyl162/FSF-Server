import { TestBed, inject } from '@angular/core/testing';

import { GroceryServiceService } from './grocery-service.service';

describe('GroceryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroceryServiceService]
    });
  });

  it('should be created', inject([GroceryServiceService], (service: GroceryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
