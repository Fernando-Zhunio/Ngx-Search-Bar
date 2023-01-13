import { InjectionToken } from "@angular/core";
import { Router } from "@angular/router";

export interface FactoryInject {
  ROUTER?: Router;
  BASE_URL: string;
}

export const DATA_FOR_SEARCH_BAR = new InjectionToken<FactoryInject>('Token de datos para la barra de búsqueda'
);
