import { FactoryInject } from './../../utils/DATA_FOR_SEARCH_BAR';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { auditTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
// import { PageEvent } from '@angular/material/paginator';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';


type Filter = { name: string, value: Array<any> | boolean | string | number | null | undefined | Filter };

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {

  constructor(
    private searchBarService: NgxSearchBarService,
    @Inject(DATA_FOR_SEARCH_BAR) private dataInject: FactoryInject,
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  @Input() placeholder: string = 'Search here';
  @Input() formFilter: Filter | null = null;
  @Input() title: string = 'Search';
  @Input() activeFilter: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() path: string = 'posts';
  @Input() withParamsClean: boolean = true;
  @Input() isChangeUrl: boolean = false;
  @Output() data = new EventEmitter<unknown>();
  @Output() loading = new EventEmitter<boolean>();
  formSearch = new FormControl('');
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  countFilter: number | null = null;
  queryParams: Filter = {};
  queryParamsNotNUllForTemplate: Map<string, unknown> = new Map();

  ngOnInit(): void {
    this.formSearch.valueChanges
      .pipe(
        auditTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        console.log(value);
        this.search();
      });
  }

  search(params: { [key: string]: number } = {}) {
    this.isLoading = true;
    this.loading.emit(this.isLoading);
    // this.queryParams = { [this.nameInputSearch]: this.formSearch.value, ...params, ...this.getQueryParams() };
    this.getQueryParams();
    console.log({ queryParams: this.queryParams });
    this.searchBarService.search(this.path, this.queryParams).subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.loading.emit(this.isLoading);
          if (this.isChangeUrl) {
            this.dataInject.ROUTER!.navigate([], {
              queryParams: this.queryParams,
              replaceUrl: true,
            })
          }
          this.data.emit(res);
        },
        error: (err) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
          console.log(err);
        }
      }
    );
  }

  filterWithNotNull(formValues: Filter): Filter {
    this.countFilter = 0;
    for (const key in formValues) {
      if (!empty(formValues[key])) {
        this.queryParamsNotNUllForTemplate.set(key, formValues[key]);
        this.countFilter = this.countFilter ? this.countFilter + 1 : 1;
      }
    }
    return Object.fromEntries(this.queryParamsNotNUllForTemplate) as Filter;
  }


  removeQueryParam(key: string) { }


  getQueryParams(params: Filter = {}): Filter {
    const formValues: any = this.formFilter instanceof FormGroup ? this.formFilter.value : this.formFilter;
    this.queryParams = {
      [this.nameInputSearch]: this.formSearch.value,
      ...params,
      ...(this.withParamsClean || Object.keys(formValues).length < 1 ? this.filterWithNotNull(formValues) : formValues || {})
    };

    this.filterWithNotNull(this.queryParams);

    return this.queryParams;

  }

}
