import { InjectionToken } from "@angular/core";

export interface FactoryInject {
  BASE_URL: string;
}

export const defaultConfigNgxSearchBar: FactoryInject = {
  BASE_URL: 'https://jsonplaceholder.typicode.com/',
}

export const DATA_FOR_SEARCH_BAR = new InjectionToken<FactoryInject>('Token de datos para la barra de búsqueda', {
  providedIn: 'root',
  factory: () => defaultConfigNgxSearchBar
}
);
