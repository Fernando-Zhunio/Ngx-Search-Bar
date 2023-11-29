import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-test-library',
  templateUrl: './test-library.component.html',
  styleUrls: ['./test-library.component.scss']
})
export class TestLibraryComponent {

  form = new FormGroup({
    'topping': new FormControl(null, []),
    'select': new FormControl(null, []),
  });
  brands: any[] = []

  getData(data: any): void {
    console.log(data);
    this.brands = data.data;
  }
}
