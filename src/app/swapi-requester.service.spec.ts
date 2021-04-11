import { TestBed } from '@angular/core/testing';

import { SwapiRequesterService } from './swapi-requester.service';

describe('SwapiRequesterService', () => {
  let service: SwapiRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
