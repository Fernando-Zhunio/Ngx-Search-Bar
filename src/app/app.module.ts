import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgxDynamicIslandModule } from 'projects/ngx-dynamic-island-fz/src/public-api';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSearchBarModule } from 'projects/ngx-search-bar/src/public-api';
// import { BASE_URL } from 'projects/ngx-search-bar/src/lib/utils/injections/base-url';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NgxDynamicIslandModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxSearchBarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
