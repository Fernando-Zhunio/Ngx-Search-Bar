import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TestLibraryComponent } from './test-library/test-library.component';
import { NgxSearchBarModule } from 'ngx-search-bar';
import { TestLibraryRoutes } from './test-library.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    // TestLibraryComponent
  ],
  imports: [
    CommonModule,
    TestLibraryRoutes,
    NgxSearchBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class TestLibraryModule { }
