import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDynamicIslandModule } from 'projects/ngx-dynamic-island-fz/src/public-api';

import { AppComponent } from './app.component';
// import { NgxDynamicIslandModule } from '../../projects/ngx-dynamic-island/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxDynamicIslandModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
