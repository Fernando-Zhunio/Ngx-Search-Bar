import { TestBed } from '@angular/core/testing';

import { NgxSearchBarService } from './ngx-search-bar.service';

describe('NgxSearchBarService', () => {
  let service: NgxSearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
