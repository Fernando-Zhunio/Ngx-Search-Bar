import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';

import { NgxSearchBarComponent } from './ngx-search-bar.component';

// class NgxSearchBarTestService {
//   search(path, par)
// }

describe('NgxSearchBarComponent', () => {
  let component: NgxSearchBarComponent;
  let fixture: ComponentFixture<NgxSearchBarComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSearchBarComponent],
      imports: [
        HttpClientTestingModule,
        MatMenuModule,
        MatBadgeModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: DATA_FOR_SEARCH_BAR,
          useValue: 'http://localhost:3000/'
        },
        // {
        //   provide: NgxSearchBarService,
        //   useClass: NgxSearchBarTestService
        // }
    
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search', () => {
    component.withParamsClean = false;
    component.path = 'posts'
    component.nameInputSearch = 'search2';
    component.formFilter = {
      "fernando": "fer",
      "fernando2": false,
    }
    component.search();
    spyOn(component.data, 'emit');
    console.log({"Fernando": component.isLoading})


    const req = httpMock.expectOne('http://localhost:3000/posts?search2=&fernando=fer');
    expect(req.request.method).toBe('GET');
    req.flush('test');

    console.log({"Fernando": component.isLoading})
    expect(component.data.emit).toHaveBeenCalledWith('test');

  })


});
