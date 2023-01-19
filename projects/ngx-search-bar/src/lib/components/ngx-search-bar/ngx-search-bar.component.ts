import { FactoryInject } from './../../utils/DATA_FOR_SEARCH_BAR';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
import { DATA_FOR_SEARCH_BAR } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxSearchBarFilter, NgxFilterValue } from '../../interfaces/structures';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() title: string = 'Search';
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() filters: NgxSearchBarFilter = {};
  @Input() withFilter: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() withParamsClean: boolean = true;

  @Output() filtersChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() data = new EventEmitter<unknown>();
  @Output() loading = new EventEmitter<boolean>();
  formSearch: FormControl = new FormControl();
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  queryParamsNotNUllForTemplate: Map<string, { friendlyName: string, value: { type: string, value: any } }> = new Map();
  router: Router = new Router;
  //#endregion Variables

  ngOnInit(): void {
    this.getQueryParamsFromUrl();
    this.autoInit && this.search();
    this.formSearch.valueChanges
      .pipe(
        debounceTime(300), 
        takeUntil(this.destroy$), 
        )
      .subscribe((value) => {
        this.search()
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
            this.router!.navigate([], {
              queryParams: queryParams,
              replaceUrl: true,
            });
          }
          this.data.emit(res);
        },
        error: (err) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
        }
      }
    );
  }

  filterVerified(): { [key: string]: NgxFilterValue } {
    const filtersOverride: { [key: string]: NgxFilterValue } = {};
    this.queryParamsNotNUllForTemplate.clear();
    for (const key in this.filters) {
      if (!empty(this.filters[key].value)) {
        this.queryParamsNotNUllForTemplate.set(key, this.getStructureForTemplate(this.filters[key]));
        filtersOverride[key] = this.filters[key].value;
      }
    }
    return this.withParamsClean ? filtersOverride : Object.keys(this.filters)
      .reduce((acc: { [key: string]: NgxFilterValue }, curr) => {
        acc[curr] = this.filters[curr].value
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
    this.filters[key].value = null;
    this.search();
  }

  getQueryParams(params: { [key: string]: NgxFilterValue } = {}): { [key: string]: NgxFilterValue } {
    return {
      [this.nameInputSearch]: this.formSearch.value,
      ...params,
      ...this.filterVerified(),
    };
  }

  getQueryParamsFromUrl(): void {
    const url = `fernando.com${window.location.search}`;
    const params = this.router.parseUrl(url).queryParams;
    if (!params) return;
    try {
      if (params.hasOwnProperty(this.nameInputSearch)) {
        this.formSearch.setValue(params[this.nameInputSearch]);
      }
      Object.keys(this.filters).forEach((key) => {
        if (params.hasOwnProperty(key)) {
          if (Array.isArray(this.filters[key].value) && !Array.isArray(params[key])) {
            this.filters[key].value = [params[key]];
          } else {
            this.filters[key].value = params[key];
          }
        }
      })
    } catch (error) {
      console.log('Url mal formada');
    }
  }

}
