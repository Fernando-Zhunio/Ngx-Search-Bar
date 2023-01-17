import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSearchBarComponent } from './components/ngx-search-bar/ngx-search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { DATA_FOR_SEARCH_BAR } from './utils/DATA_FOR_SEARCH_BAR';
import { MatPaginatorModule} from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NgxSearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  exports: [
    NgxSearchBarComponent,
  ],
  providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
          ROUTER: { navigate(_a: never[], _b: { queryParams: { [x: string]: any; }; replaceUrl: true; }): void { alert('Please inject provider de Router with token DATA_FOR_SEARCH_BAR for use input isChangeUrl to true, in component NgxSearchBarComponent'); throw 'Please inject provider de Router with token DATA_FOR_SEARCH_BAR' } },
          BASE_URL: 'https://jsonplaceholder.typicode.com/'
      },
    }
  ]
})
export class NgxSearchBarModule { }
