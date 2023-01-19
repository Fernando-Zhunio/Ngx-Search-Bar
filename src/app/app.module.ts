import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from 'projects/ngx-search-bar/src/public-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
      useValue: {
        BASE_URL: 'https://localhost:7124/api/',
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
