import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { FormControl } from '@angular/forms';
// import { NgxSearchBarFilter } from 'projects/ngx-search-bar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  form = new FormGroup({
    'topping': new FormControl(null, [])
  });
  brands: any[] = []

  getData(data: any): void {
    console.log(data);
    this.brands = data.data;
  }
}
