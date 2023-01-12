import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BASE_URL } from './utils/injections/base-url';

@Injectable({
  providedIn: 'root'
})
export class NgxSearchBarService {

  constructor(private http: HttpClient ,
    @Inject(BASE_URL) private baseUrl: string)  { }
  
  search(path: string, params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, {params});
  }
}
