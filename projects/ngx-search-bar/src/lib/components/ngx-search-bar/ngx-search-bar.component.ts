import { FactoryInject } from './../../utils/DATA_FOR_SEARCH_BAR';
import { Component, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { auditTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxFilter as NgxSearchBarFilter, NgxFilterValue, NgxPaginateOptions } from '../../interfaces/structures';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {
  constructor(
    private searchBarService: NgxSearchBarService,
    private activatedRoute: ActivatedRoute,
    @Inject(DATA_FOR_SEARCH_BAR) private dataInject: FactoryInject,
  ) {
    try {
      this.router = inject(Router);
    } catch (error) {

      console.error({ error });
    }
  }

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() title: string = 'Search';
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() formFilter: NgxSearchBarFilter = {};
  @Input() withPaginator: boolean = true;
  @Input() paginatorOptions!: Partial<NgxPaginateOptions>;
  @Input() withFilter: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() withParamsClean: boolean = true;

  @Output() formFilterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() data = new EventEmitter<unknown>();
  @Output() loading = new EventEmitter<boolean>();
  formSearch = new FormControl('');
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  queryParamsNotNUllForTemplate: Map<string, { friendlyName: string, value: { type: string, value: any } }> = new Map();
  router: Router | null = null;
  //#endregion Variables

  ngOnInit(): void {
    this.setOptionsPaginate(this.dataInject.OPTIONS);
    this.getQueryParamsFromUrl();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getQueryParamsFromUrl(): void {
    const path = window.location.search || '?search=&filter1=filter1&filter2=true&filter3=fer&filter3=fer2&pageIndex=1&pageSize=25&filter3=fer'

    let arr = path.replace('?', '').split('&')
    const res = arr.reduce((acc: any, curr, index) => {
      const aux: any = curr.split('=')
      console.log(aux)
      if (aux.length != 2) {
        return acc;
      }

      if (acc[aux[0]]) {
        if (typeof acc[aux[0]] == 'string') {
          acc[aux[0]] = [acc[aux[0]], aux[1]]
        } else {
          acc[aux[0]].push(aux[1])
        }
      } else {
        acc[aux[0]] = aux[1];
      }
      return acc;
    }, {})
    console.log(res)
    const params1 = this.activatedRoute.snapshot;
    console.log({ params1 });
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log({ params2: params });
      const keysParams = Object.keys(params)
      if (keysParams.length < 1) return;
      try {
        const { pageIndex, pageSize } = this.paginatorOptions.overrideSendPaginateParams || {};
        if (params[pageIndex!]) {
          this.paginatorOptions.pageIndex = Number.parseInt(params[pageIndex!])
        }
        if (params[pageSize!]) {
          this.paginatorOptions.pageSize = Number.parseInt(params[pageSize!])
        }
        if (params[this.nameInputSearch]) {
          this.formSearch.setValue(params[this.nameInputSearch]);
        }
        const paramsNotFilter = [pageIndex, pageSize, this.nameInputSearch];
        keysParams.filter(x => !paramsNotFilter.includes(x)).forEach((key) => {
          if (this.formFilter[key])
            if (Array.isArray(this.formFilter[key].value) && !Array.isArray(params[key])) {
              this.formFilter[key].value = [params[key]];
            } else {
              this.formFilter[key].value = params[key];
            }
        });
      } catch (error) {
        alert('Url mal formada');
      }
      this.autoInit && this.search();
      this.formSearch.valueChanges
        .pipe(
          auditTime(1000),
          takeUntil(this.destroy$)
        )
        .subscribe((value) => {
          this.search();
        });
    });
  }

  setOptionsPaginate(options: NgxPaginateOptions | {} = {}): void {
    const optionsAux = { ...this.paginatorOptions };
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
    this.paginatorOptions = { ...optionsAux2, ...optionsAux };
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
          if (this.isChangeUrl && this.router) {
            this.router!.navigate([], {
              queryParams: queryParams,
              replaceUrl: true,
            })
          }
          this.data.emit(res);
          if (this.withPaginator && this.dataInject.OPTIONS?.overrideRecibePaginateParams) {
            this.dataInject.OPTIONS?.overrideRecibePaginateParams(res, this.bindRecibeData.bind(this));
            console.log({ page: this.paginatorOptions });
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
    this.paginatorOptions.length = length;
    this.paginatorOptions.pageIndex = pageIndex;
    this.paginatorOptions.pageSize = pageSize;
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
        [this.paginatorOptions.overrideSendPaginateParams!.pageIndex]: this.paginatorOptions.pageIndex!,
        [this.paginatorOptions.overrideSendPaginateParams!.pageSize]: this.paginatorOptions.pageSize,
      } : {}),
    };
  }

  handlePageEvent(e: PageEvent) {
    this.paginatorOptions.length = e.length;
    this.paginatorOptions.pageSize = e.pageSize;
    this.paginatorOptions.pageIndex = e.pageIndex;
    this.search();
  }


}
