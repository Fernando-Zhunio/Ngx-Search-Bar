import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import {  MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxSearchBarComponent } from './ngx-search-bar.component';

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
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: DATA_FOR_SEARCH_BAR,
          useValue: {
            ROUTER: { navigate(_a: never[], _b: { queryParams: { [x: string]: any; }; replaceUrl: true; }): void { alert('Please inject provider de Router with token DATA_FOR_SEARCH_BAR for use input isChangeUrl to true, in component NgxSearchBarComponent'); throw 'Please inject provider de Router with token DATA_FOR_SEARCH_BAR' } },
            BASE_URL: 'http://localhost:3000/',
            OPTIONS: {
              disabled: true,
              sizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
              overrideRecibePaginateParams: (res: any, bindRecibeData: (length: number, pageIndex: number, pageSize: number) => void) => {
                bindRecibeData(res.length, res.pageIndex, res.pageSize);
              }
            }
          }
        },
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
    component.withPaginator = false;
    component.path = 'posts'
    component.nameInputSearch = 'search2';
    component.formFilter = {
      "fernando": {
        friendlyName: 'Fernando',
        value: 'fer',
      }, 
      "fernando2": {
        friendlyName: 'Fernando2',
        value: 'fer2',
      },
    }
    component.search();
    spyOn(component.data, 'emit');


    const req = httpMock.expectOne('http://localhost:3000/posts?search2=&fernando=fer&fernando2=fer2');
    expect(req.request.method).toBe('GET');
    req.flush('test');

    expect(component.data.emit).toHaveBeenCalledWith('test');

  })

  it('#search with paginator', () => {
    component.withParamsClean = false;
    component.withPaginator = true;
    component.path = 'posts'
    component.nameInputSearch = 'search2';
    component.formFilter = {
      "fernando": {
        friendlyName: 'Fernando',
        value: 'fer',
      }, 
      "fernando2": {
        friendlyName: 'Fernando2',
        value: 'fer2',
      },
    }
    component.search();
    spyOn(component.data, 'emit');

    const req = httpMock.expectOne('http://localhost:3000/posts?search2=&fernando=fer&fernando2=fer2&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush('test');

    expect(component.data.emit).toHaveBeenCalledWith('test');
  })

  it('#validate options', () => {
    component.paginatorOptions = {
      pageIndex: 20,
      pageSize: 150,
      disabled: false,
      overrideSendPaginateParams: {
        pageIndex: 'page',
        pageSize: 'size',
        length: 'total',
      },
    }
    component.setOptionsPaginate();
    expect(component.paginatorOptions.pageIndex).toBe(20);
    expect(component.paginatorOptions.pageSize).toBe(150);
    expect(component.paginatorOptions.disabled).toBeFalse(); 
    expect(component.paginatorOptions.overrideSendPaginateParams!.pageIndex).toBe('page');
    expect(component.paginatorOptions.overrideSendPaginateParams!.pageSize).toBe('size');
    expect(component.paginatorOptions.overrideSendPaginateParams!.length).toBe('total');
    expect(component.paginatorOptions.disabled).toBeFalse();
    fixture.detectChanges();

    expect(component.paginatorOptions.showFirstLastButtons).toBeTrue();
  });

  it('#validate callback overrideRecibePaginateParams', () => {
    component.withPaginator = true;
    component.search();
    const req = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush({length: 100, pageIndex: 1, pageSize: 15});
    console.log({component: component['dataInject']})
    expect(component.paginatorOptions.length).toBe(100);
  });

  it('#handlePageEvent', () => {
    component.withPaginator = true;
    component.handlePageEvent({length: 100, pageIndex: 0, pageSize: 15});
    const req = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush({length: 100, pageIndex: 1, pageSize: 15});
    console.log({component: component['dataInject']})
    expect(component.paginatorOptions.length).toBe(100);

    component.handlePageEvent({length: 100, pageIndex: 1, pageSize: 15});
    const req2 = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=2&pageSize=15');
    expect(req2.request.method).toBe('GET');
    req2.flush({length: 100, pageIndex: 2, pageSize: 15});
    console.log({component: component['dataInject']})
    expect(component.paginatorOptions.length).toBe(100);
  });
});
