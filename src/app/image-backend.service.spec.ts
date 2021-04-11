import { TestBed } from '@angular/core/testing';

import { ImageBackendService } from './image-backend.service';

describe('ImageBackendService', () => {
  let service: ImageBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
