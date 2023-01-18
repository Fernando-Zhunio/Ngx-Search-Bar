import { InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { NgxPaginateOptions } from "../interfaces/structures";

export interface FactoryInject {
  BASE_URL: string;
  OPTIONS?: Partial<NgxPaginateOptions>
}

export const defaultConfigNgxSearchBar: FactoryInject = {
  BASE_URL: 'https://jsonplaceholder.typicode.com/',
  OPTIONS: {
    paramsResponse: {
      length: 'recordCount',
      pageIndex: 'currentPage',
      pageSize: 'pageSize',
    }
  }
}

export const DATA_FOR_SEARCH_BAR = new InjectionToken<FactoryInject>('Token de datos para la barra de búsqueda', {
  providedIn: 'root',
  factory: () => defaultConfigNgxSearchBar
}
);
