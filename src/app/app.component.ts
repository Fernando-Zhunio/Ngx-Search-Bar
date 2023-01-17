import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { NgxFilter } from 'projects/ngx-search-bar/src/public-api';

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

  filters: NgxFilter = {
    'filter1': {
      friendlyName: 'Tiendas',
      value: 'filter1'
    },
    'filter2': {
      friendlyName: 'Celulares',
      value: true
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
