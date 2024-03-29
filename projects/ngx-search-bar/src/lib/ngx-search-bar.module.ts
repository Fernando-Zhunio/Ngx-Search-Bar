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
import { MatPaginatorModule} from '@angular/material/paginator';
import { NgxSearchBarFormFilterComponent } from './components/ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';
import { NgxSearchBarPaginatorComponent } from './components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';

@NgModule({
  declarations: [
    NgxSearchBarComponent,
    NgxSearchBarFormFilterComponent,
    NgxSearchBarPaginatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgxSearchBarFormFilterComponent,
    NgxSearchBarPaginatorComponent,
  ],
  providers: [
  ]
})
export class NgxSearchBarModule { }
