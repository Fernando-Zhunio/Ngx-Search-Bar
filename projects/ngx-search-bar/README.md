# Ngx Search Bar with angular material

The package needs angular material to work (This package is compatible with angular 15)

## Installation

To install this library, run:

```bash
$ npm install ngx-search-bar-fz --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// Import your library
import {
  DATA_FOR_SEARCH_BAR,
  NgxSearchBarModule,
} from "ngx-search-bar-fz";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Specify your library as an import
    NgxSearchBarModule,
  ],
  providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
        BASE_URL: "https://localhost:7124/api/",
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Custom provider (IMPORTANT)

You need to override the DATA_FOR_SEARCH_BAR provider for the component to work
The provider must have the following structure:

```typescript
providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
        BASE_URL: 'https://localhost:7124/api/',
      }
    },
  ],
```

Usage in templates is as simple as:

```html
<ngx-search-bar
  title="Novisolutions "
  (data)="getData($event)"
  path="brands"
  [isChangeUrl]="true"
  [(formFilter)]="filters"
>
</ngx-search-bar>
```

## Inputs

| Name             | Type                          | Default       | Description                                         |
| ---------------- | ----------------------------- | ------------- | --------------------------------------------------- |
| placeholder      | string                        | 'Search here' | Entry placeholder                                   |
| title            | string                        | 'Search'      | Component Title                                     |
| path             | string                        | search        | Route for requests                                  |
| isChangeUrl      | boolean                       | false         | If the url should be changed when doing a search    |
| formFilter       | NgxSearchBarFilter            | {}            | Object to filter the data                           |                      
| withFilter       | boolean                       | false         | Whether to use the filter                           |
| autoInit         | boolean                       | true          | If it automatically starts searching                |
| nameInputSearch  | string                        | search        | Name of the search input to send to the backend     |
| withParamsClean  | boolean                       | false         | If necessary, non-empty or null parameters are sent |

## Outputs

| Names            | Type    | Description                            |
| ---------------- | ------- | -------------------------------------- |
| data             | unknown | Event fired when data is received      |
| formFilterChange | unknown | Event triggered when filter is changed |
| loading          | boolean | Event fired when load state is changed |

## Slots

| Name       | Description                                              |
| ---------- | -------------------------------------------------------- |
| filterMenu | Filter slot here you should color the filter entries     |
| (blank)    | It will appear between the search bar and the pagination |
| buttons    | Button slot next to filter button                        |

Slots Usage Example

```html
<ngx-search-bar
  title="Novisolutions "
  (data)="getData($event)"
  path="brands"
  [isChangeUrl]="true"
  [(formFilter)]="filters"
>
  <!-- Aqui va los inputs de filtro -->
  <div style="padding: 10px" filterMenu>
    <ng-container>
      <mat-form-field style="width: 100%">
        <mat-label>Search</mat-label>
        <input matInput type="text" [(ngModel)]="filters['filter1'].value" />
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Search</mat-label>
        <input matInput type="text" [(ngModel)]="filters['filter2'].value" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Toppings</mat-label>
        <mat-select [(ngModel)]="filters['filter3'].value" multiple>
          <mat-option value="fer">fer</mat-option>
          <mat-option value="fer2">fer2</mat-option>
          <mat-option value="fer3">fer3</mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
  </div>

  <!-- Aqui va entre la paginacion y la barra -->
  <div style="margin-top: 20px;">
    <div *ngFor="let brand of brands">
      <div>{{ brand.name }}</div>
    </div>
  </div>
</ngx-search-bar>
```
## Example img 

![Example](/forReadme.jpg)