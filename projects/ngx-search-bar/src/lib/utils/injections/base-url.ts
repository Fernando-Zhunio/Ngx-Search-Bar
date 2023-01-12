import { InjectionToken } from "@angular/core";

export const BASE_URL = new InjectionToken<string>('https://jsonplaceholder.typicode.com/', {
    providedIn: 'root',
    factory: () => 'https://jsonplaceholder.typicode.com/'
  });
