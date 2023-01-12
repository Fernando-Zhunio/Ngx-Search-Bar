# NgxDynamicIsland Notification

This is a notification component for Angular 14+.

## Installation

To install this library, run:

```bash
$ npm install ngx-dynamic-island --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxDynamicIslandModule } from 'ngx-dynamic-island';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxDynamicIslandModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Usage in templates is as simple as:

```html

<ngx-dynamic-island></ngx-dynamic-island>

```

### Individual components can inject NgxDynamicIslandService

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxDynamicIslandService } from 'ngx-dynamic-island';

@Component({
  selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngxDynamicIslandService: NgxDynamicIslandService) {}

  ngOnInit() {
    this.ngxDynamicIslandService.show({
      title: 'Notification',
      message: 'This is a notification',
      type: 'success',
    });
  }

  showNotification(status: any) {
    this.ndis.show({
      title: 'Notification',
      pathOrUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      content: 'new content',
      createdAt: new Date
    }, {status, action: 'download', position: 'top-center'});
  }
}
```

#### Inputs

| Name | Type | Default | Description |
| maxWidthPx | number | 600px | max width of notifications |
| position | NgxDynamicIslandPosition | 'bottom-right' | position of notifications |
| duration | number | 4000 | duration of notifications |
| status | NgxDynamicIslandStatus | 'info' | status of notifications |
| action | NgxDynamicIslandAction | 'close' | action of notifications |


#### Actions 
'download' | 'redirect' | 'html' | 'none';

#### Statuses
'warning' | 'danger' | 'success' | 'info' | 'light';