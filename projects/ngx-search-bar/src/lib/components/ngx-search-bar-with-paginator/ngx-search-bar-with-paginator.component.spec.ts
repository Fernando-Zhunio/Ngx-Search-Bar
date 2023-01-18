/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxSearchBarWithPaginatorComponent } from './ngx-search-bar-with-paginator.component';

describe('NgxSearchBarWithPaginatorComponent', () => {
  let component: NgxSearchBarWithPaginatorComponent;
  let fixture: ComponentFixture<NgxSearchBarWithPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSearchBarWithPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarWithPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
