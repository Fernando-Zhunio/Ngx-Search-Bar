import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from 'projects/ngx-search-bar/src/public-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { NgxPaginateOptions } from 'ngx-search-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
          BASE_URL: 'https://localhost:7124/api/',
          OPTIONS: {
            paramsResponse: (res: any, callback) => {
              const { currentPage, recordCount, pageSize } = res.data;
              callback(recordCount, currentPage, pageSize);
            }
          } as Partial<NgxPaginateOptions>
        }
      },
      deps: [Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
