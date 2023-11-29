import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TestLibraryComponent } from './test-library/test-library.component';
import { NgxSearchBarModule } from 'ngx-search-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TestLibraryComponent } from './test-library/test-library.component';

const routes = [
  { path: 'test', component: TestLibraryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class TestLibraryRoutes { }
