# Ngx Search Bar

Paquete necesita de angular material para funcionar

## Installation

To install this library, run:

```bash
$ npm install ngx-search-bar --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from 'projects/ngx-search-bar/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxSearchBarModule
  ],
  providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useFactory: (router: Router) => {
        return {
          BASE_URL: 'https://localhost:7124/api/',
          ROUTER: router,
          OPTIONS: {
            overrideRecibePaginateParams: (res: any, callback) => {
              const { currentPage, recordCount, pageSize } = res.data;
              callback(recordCount, currentPage, pageSize);
            }
          } as Partial<NgxPaginateOptions>
        }
      },
      deps: [Router]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Custom provider (IMPORTANT)

Es necesario sobrescribir el provider DATA_FOR_SEARCH_BAR para que funcione el componente
El provider debe tener la siguiente estructura:

```typescript
{
  provide: DATA_FOR_SEARCH_BAR,
  useFactory: (router: Router) => {
    return {
      BASE_URL: 'https://localhost:7124/api/',
      ROUTER: router,
      OPTIONS: {
        overrideRecibePaginateParams: (res: any, callback) => {
          const { currentPage, recordCount, pageSize } = res.data;
          callback(recordCount, currentPage, pageSize);
        }
      } as Partial<NgxPaginateOptions>
    }
  },
  deps: [Router]
}
```

## Datos de proveedor

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| BASE_URL | string | Url base para las peticiones |
| ROUTER | Router | Router de la aplicación (requerido si usa pagination) |
| OPTIONS | Partial<NgxPaginateOptions> | Opciones de paginación |

## NgxPaginateOptions custom

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| overrideRecibePaginateParams | (res: any, callback: (recordCount: number, currentPage: number, pageSize: number) => void) => void | Función para sobrescribir la respuesta de la pagination hacer funcionar la pagination |
| overrideSendPaginateParams | { length: string; pageIndex: string; pageSize: string;}; | Objeto para sobrescribir los parametros que se enviaran al backend |



Usage in templates is as simple as:

```html

<ngx-search-bar title="Novisolutions " (data)="getData($event)" path="brands" [isChangeUrl]="true" [(formFilter)]="filters">

</ngx-search-bar>
```

## Inputs
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| placeholder | string | 'Search here' | Placeholder del input |
| title | string | 'Search' | Titulo del componente |
| path | string | 'search' | Path para las peticiones |
| isChangeUrl | boolean | false | Si se debe cambiar la url al hacer una busqueda |
| formFilter | NgxSearchBarFilter | {} | Objeto para filtrar los datos |
| withPaginator | boolean | false | Si se debe usar la paginación |
| paginatorOptions | Partial< NgxPaginateOptions >  | {} | Opciones de la paginación |
| withFilter | boolean | false | Si se debe usar el filtro |
| autoInit | boolean | true | Si inicia al automáticamente a buscar |
| nameInputSearch | string | 'search' | Nombre del input de busqueda que se enviara al backend |
| withParamsClean | boolean | false | Si se debe envian parametros no vacios o nulos |


## Outputs

| Name | Type | Description |
| --- | --- | --- |
| data | unknown | Evento que se dispara cuando se recibe la data |
| formFilterChange | unknown | Evento que se dispara cuando se cambia el filtro |
| loading | boolean | Evento que se dispara cuando se cambia el estado de carga |


## Slots 

| Name | Description |
| --- | --- |
| filterMenu | Slot para el filtro aqui se debera color los input de filtro |
| (en blanco) | Se rendizara entre la barra de busqueda y la paginacion |
| buttons | Slot para los botones a lado del boton de filtro |

Ejemplo de uso de slots

```html

<ngx-search-bar title="Novisolutions " (data)="getData($event)" path="brands" [isChangeUrl]="true" [(formFilter)]="filters">

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
        <mat-select [(ngModel)]="filters['filter3'].value"  multiple>
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