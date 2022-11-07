import { TestBed } from '@angular/core/testing';

import { NgxDynamicIslandService } from './ngx-dynamic-island.service';

describe('NgxDynamicIslandService', () => {
  let service: NgxDynamicIslandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicIslandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
