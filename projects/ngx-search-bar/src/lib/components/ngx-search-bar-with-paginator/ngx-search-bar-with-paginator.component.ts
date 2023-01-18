import { NgxSearchBarService } from './../../ngx-search-bar.service';
import { NgxSearchBarComponent } from './../ngx-search-bar/ngx-search-bar.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { NgxPaginateOptions } from 'ngx-search-bar';
import { PageEvent } from '@angular/material/paginator';
import { NgxFilter, NgxPaginateOptions } from '../../interfaces/structures';

@Component({
  selector: 'app-ngx-search-bar-with-paginator',
  templateUrl: './ngx-search-bar-with-paginator.component.html',
  styleUrls: ['./ngx-search-bar-with-paginator.component.css']
})
export class NgxSearchBarWithPaginatorComponent implements OnInit {

  @ViewChild(NgxSearchBarComponent) searchBar!: NgxSearchBarComponent;
  constructor(private ngxSearchBarService: NgxSearchBarService) { }
  @Input() paginatorOptions!: Partial<NgxPaginateOptions>;
  paginatorEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  }

  ngOnInit() {
    this.ngxSearchBarService.useMatPaginator = true;
    this.setQueryParamsFromUrl();
  }

  search(params: { [key: string]: NgxFilter } | {} = {}) {
    const paramsAux = { ...params, ...this.getParamsPaginate() };
    this.searchBar.search(paramsAux);
  }

  getParamsPaginate(): { [key: string]: any } {
    const { pageIndex, pageSize } = this.paginatorOptions.paramsRequest || this.paginatorOptions.paramsRequest!;
    return {
      [pageIndex]: this.paginatorEvent.pageIndex,
      [pageSize]: this.paginatorEvent.pageSize,
    }
  }

  setQueryParamsFromUrl(): void {
    try {
      const params = new URLSearchParams(window.location.search);
      const { pageIndex, pageSize } = this.paginatorOptions.paramsRequest || this.paginatorOptions.paramsRequest!;
      if (params.has(pageIndex!)) {
        this.paginatorEvent.pageIndex = Number.parseInt(params.get(pageIndex!)!)
      }
      if (params.has(pageSize!)) {
        this.paginatorEvent.pageSize = Number.parseInt(params.get(pageSize!)!)
      }
    } catch (error) {
      console.error('No se pudo convertir la page y el tamaño de pagina de la url'+error);
    }
  }

  setOptionsPaginate(options: NgxPaginateOptions | {} = {}): void {
    const optionsAux = { ...this.paginatorOptions };
    const optionsAux2: Required<NgxPaginateOptions> = {
      disabled: false,
      showFirstLastButtons: true,
      sizeOptions: [10, 25, 50, 100],
      hidePageSize: false,
      paramsRequest: {
        length: 'length',
        pageIndex: 'pageIndex',
        pageSize: 'pageSize',
      },
      paramsResponse: {
        length: 'length',
        pageIndex: 'pageIndex',
        pageSize: 'pageSize',
      },
      ...options
    }
    this.paginatorOptions = { ...optionsAux2, ...optionsAux };
  }

  handlePageEvent(event: PageEvent) {
    this.paginatorEvent = event;
    this.search();
  }

}
