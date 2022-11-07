import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDynamicIslandComponent, NgxDynamicIslandContainerComponent } from './ngx-dynamic-island/ngx-dynamic-island.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NgxDynamicIslandComponent,
    NgxDynamicIslandContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([])
  ],
  exports: [
    NgxDynamicIslandComponent,
    NgxDynamicIslandContainerComponent
  ]
})
export class NgxDynamicIslandModule { }
