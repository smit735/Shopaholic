import { TestBed } from '@angular/core/testing';

import { StoresserviceService } from './storesservice.service';

describe('StoresserviceService', () => {
  let service: StoresserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
