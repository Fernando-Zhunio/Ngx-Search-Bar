import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { NgxSearchBarFilter } from 'projects/ngx-search-bar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-dynamic-island';

  constructor() {}
  ngOnInit(): void {
  }

  filters: NgxSearchBarFilter = {
    'filter1': {
      friendlyName: 'Tiendas',
      value: ''
    },
    'filter2': {
      friendlyName: 'Celulares',
      value: false
    },
    'filter3': {
      friendlyName: 'Categorias',
      value: []
    }
  };

  brands: any[] = []

  getData(data: any): void {
    console.log(data);
    this.brands = data.data.results;
  }

}
