import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { DATA_FOR_SEARCH_BAR, FactoryInject } from './utils/DATA_FOR_SEARCH_BAR';

@Injectable({
  providedIn: 'root'
})
export class NgxSearchBarService {

  constructor(private http: HttpClient ,
    @Inject(DATA_FOR_SEARCH_BAR) private data: FactoryInject)  { }
  
  search(path: string, params: any): Observable<any> {
    return this.http.get(`${this.data.BASE_URL}${path}`, {params});
  }
}
