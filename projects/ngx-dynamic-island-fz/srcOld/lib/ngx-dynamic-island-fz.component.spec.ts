import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicIslandFzComponent } from './ngx-dynamic-island-fz.component';

describe('NgxDynamicIslandFzComponent', () => {
  let component: NgxDynamicIslandFzComponent;
  let fixture: ComponentFixture<NgxDynamicIslandFzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicIslandFzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDynamicIslandFzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
