import { Component } from '@angular/core';
import { NgxSearchBarFilter } from 'projects/ngx-search-bar/src/public-api';

@Component({
  selector: 'ngx-test-library',
  templateUrl: './test-library.component.html',
  styleUrls: ['./test-library.component.scss']
})
export class TestLibraryComponent {

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
