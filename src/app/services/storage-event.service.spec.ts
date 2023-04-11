import { TestBed } from '@angular/core/testing';

import { StorageEventService } from './storage-event.service';

describe('StorageEventService', () => {
  let service: StorageEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
