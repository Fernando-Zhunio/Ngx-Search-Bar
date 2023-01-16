import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from 'projects/ngx-search-bar/src/public-api';
// import { BASE_URL } from 'projects/ngx-search-bar/src/lib/utils/injections/base-url';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxSearchBarModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useFactory: (router: Router) => {
        return {
          BASE_URL: 'https://jsonplaceholder.typicode.com/',
          ROUTER: router
        }
      },
      deps: [Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
