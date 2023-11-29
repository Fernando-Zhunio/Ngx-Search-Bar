import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
// import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { TestLibraryComponent } from './test-library/test-library/test-library.component';
import { AppRoutingModule } from './app.routing';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NGX_SEARCH_BAR_DATA, NgxSearchBarModule } from 'ngx-search-bar-fz';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSearchBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {
      provide: NGX_SEARCH_BAR_DATA,
      useValue: {
        BASE_URL: 'https://jsonplaceholder.typicode.com',
        OPTIONS: {
          customBtnApplyFilter: {
            text: 'Apply',
            color: 'primary',
            class: 'btn-apply-filter',
            icon: 'done',
          }
        }
      }
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      // useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
