import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSearchBarComponent } from './ngx-search-bar.component';

describe('NgxSearchBarComponent', () => {
  let component: NgxSearchBarComponent;
  let fixture: ComponentFixture<NgxSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
