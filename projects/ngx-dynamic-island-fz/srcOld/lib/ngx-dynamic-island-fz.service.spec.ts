import { TestBed } from '@angular/core/testing';

import { NgxDynamicIslandFzService } from './ngx-dynamic-island-fz.service';

describe('NgxDynamicIslandFzService', () => {
  let service: NgxDynamicIslandFzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicIslandFzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
