import { InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { NgxPaginateOptions } from "../interfaces/structures";

export interface FactoryInject {
  ROUTER?: Router;
  BASE_URL: string;
  OPTIONS?: Partial<NgxPaginateOptions>
}

export const defaultConfigNgxSearchBar: FactoryInject = {
  BASE_URL: 'https://jsonplaceholder.typicode.com/',
  OPTIONS: {
    overrideRecibePaginateParams: (res: any , callback: (length: number, pageIndex: number, pageSize: number) => void) => {
      callback(res.length, res.pageIndex, res.pageSize);
    }
  }
}

export const DATA_FOR_SEARCH_BAR = new InjectionToken<FactoryInject>('Token de datos para la barra de búsqueda', {
  providedIn: 'root',
  factory: () => defaultConfigNgxSearchBar
} 
);
