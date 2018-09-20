import { TestBed, inject } from '@angular/core/testing';

import { CartApiService } from './cart-api.service';

describe('CartApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartApiService]
    });
  });

  it('should be created', inject([CartApiService], (service: CartApiService) => {
    expect(service).toBeTruthy();
  }));
});
