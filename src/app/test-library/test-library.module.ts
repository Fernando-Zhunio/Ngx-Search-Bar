import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TestLibraryComponent } from './test-library/test-library.component';
// import { NgxSearchBarModule } from 'project/ngx-search-bar/src/public-api';
import { TestLibraryRoutes } from './test-library.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TestLibraryComponent } from './test-library/test-library.component';
import { NgxSearchBarModule } from 'ngx-search-bar';



@NgModule({
  declarations: [
    TestLibraryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestLibraryRoutes,
    NgxSearchBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class TestLibraryModule { }
