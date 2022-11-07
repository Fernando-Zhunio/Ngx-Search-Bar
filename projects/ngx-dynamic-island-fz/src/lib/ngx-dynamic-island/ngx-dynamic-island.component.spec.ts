import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicIslandComponent } from './ngx-dynamic-island.component';

describe('NgxDynamicIslandComponent', () => {
  let component: NgxDynamicIslandComponent;
  let fixture: ComponentFixture<NgxDynamicIslandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicIslandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
