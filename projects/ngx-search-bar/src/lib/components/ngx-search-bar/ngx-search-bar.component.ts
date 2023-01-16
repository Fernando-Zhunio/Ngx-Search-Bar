import { FactoryInject } from './../../utils/DATA_FOR_SEARCH_BAR';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { auditTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
// import { PageEvent } from '@angular/material/paginator';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxFilter, NgxFilterValue, NgxPaginateOptions } from '../../interfaces/structures';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {
  constructor(
    private searchBarService: NgxSearchBarService,
    @Inject(DATA_FOR_SEARCH_BAR) private dataInject: FactoryInject,
  ) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() formFilter: NgxFilter = {};
  @Output() formFilterChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string = 'Search';
  @Input() activeFilter: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() path: string = 'posts';
  @Input() withParamsClean: boolean = true;
  @Input() withPaginator: boolean = true;
  @Input() pageOptions!: Partial<NgxPaginateOptions>;
  @Input() isChangeUrl: boolean = false;
  @Output() data = new EventEmitter<unknown>();
  @Output() loading = new EventEmitter<boolean>();
  formSearch = new FormControl('');
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  queryParamsNotNUllForTemplate: Map<string, { friendlyName: string, value: { type: string, value: any } }> = new Map();
  //#endregion Variables

  ngOnInit(): void {
    this.setOptionsPaginate(this.dataInject.OPTIONS);
    this.formSearch.valueChanges
      .pipe(
        auditTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.search();
      });
  }

  setOptionsPaginate(options: NgxPaginateOptions | {} = {}): void {
    const optionsAux = { ...this.pageOptions };
    const optionsAux2: NgxPaginateOptions = {
      length: 0,
      pageIndex: 0,
      pageSize: 15,
      disabled: false,
      showFirstLastButtons: true,
      sizeOptions: [10, 25, 50, 100],
      hidePageSize: false,
      overrideRecibePaginateParams: undefined,
      overrideSendPaginateParams: {
        length: 'length',
        pageIndex: 'pageIndex',
        pageSize: 'pageSize',
      },
      ...options
    }
    this.pageOptions = { ...optionsAux2, ...optionsAux };
  }

  search(params: { [key: string]: number } = {}) {
    this.isLoading = true;
    this.loading.emit(this.isLoading);
    const queryParams = this.getQueryParams(params);
    this.searchBarService.search(this.path, queryParams).subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
          if (this.isChangeUrl) {
            this.dataInject.ROUTER!.navigate([], {
              queryParams: queryParams,
              replaceUrl: true,
            })
          }
          this.data.emit(res);
          if (this.withPaginator && this.dataInject.OPTIONS?.overrideRecibePaginateParams) {
            this.dataInject.OPTIONS?.overrideRecibePaginateParams(res, this.bindRecibeData.bind(this));
            console.log({ page: this.pageOptions });
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
        }
      }
    );
  }

  bindRecibeData(length: number, pageIndex: number, pageSize: number): void {
    this.pageOptions.length = length;
    this.pageOptions.pageIndex = pageIndex;
    this.pageOptions.pageSize = pageSize;
  }

  filterVerified(): { [key: string]: NgxFilterValue } {
    const filtersOverride: { [key: string]: NgxFilterValue } = {};
    this.queryParamsNotNUllForTemplate.clear();
    for (const key in this.formFilter) {
      if (!empty(this.formFilter[key].value)) {
        this.queryParamsNotNUllForTemplate.set(key, this.getStructureForTemplate(this.formFilter[key]));
        filtersOverride[key] = this.formFilter[key].value;
      }
    }
    return this.withParamsClean ? filtersOverride : Object.keys(this.formFilter)
      .reduce((acc: { [key: string]: NgxFilterValue }, curr) => {
        acc[curr] = this.formFilter[curr].value
        return acc;
      }, {});
  }

  getStructureForTemplate(struct: { friendlyName: string, value: NgxFilterValue }): { friendlyName: string, value: { type: string, value: any } } {
    return {
      friendlyName: struct.friendlyName,
      value: this.forStructure(struct.value)
    }
  }

  forStructure(value: NgxFilterValue): any {
    const type = typeof value;
    if (type === 'string' || type === 'number') {
      return {
        type,
        value
      }
    }
    if (type === 'boolean') {
      return {
        type,
        value: false
      }
    }
    if (Array.isArray(value)) {
      return {
        type: 'array',
        value: `x${value.length}`
      }
    }
    if (type === 'object') {
      return {
        type: 'object',
        value: `x${Object.keys('value').length}`
      }
    }
  }

  removeQueryParam(key: string) {
    this.queryParamsNotNUllForTemplate.delete(key);
    this.formFilter[key].value = null;
    this.search();
  }

  getQueryParams(params: { [key: string]: NgxFilterValue } = {}): { [key: string]: NgxFilterValue } {
    return {
      [this.nameInputSearch]: this.formSearch.value,
      ...params,
      ...this.filterVerified(),
      ...(this.withPaginator ? {
        [this.pageOptions.overrideSendPaginateParams!.pageIndex]: this.pageOptions.pageIndex! + 1,
        [this.pageOptions.overrideSendPaginateParams!.pageSize]: this.pageOptions.pageSize,
      } : {}),
    };
  }

  handlePageEvent(e: PageEvent) {
    this.pageOptions.length = e.length;
    this.pageOptions.pageSize = e.pageSize;
    this.pageOptions.pageIndex = e.pageIndex;
    this.search();
  }
}
