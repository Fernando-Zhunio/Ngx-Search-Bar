import { Component, OnInit } from '@angular/core';
import { NgxDynamicIslandService } from 'projects/ngx-dynamic-island-fz/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-dynamic-island';

  constructor(private ndis: NgxDynamicIslandService) {}
  ngOnInit(): void {
    setInterval(() => {
      this.showNotification();
    }, 5000);
  }

  showNotification() {
    this.ndis.show({
      title: 'Test',
      action: 'download',
      pathOrUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      content: 'lorem loremxa XASC ASC SDC SD SAC AXCS C XA Za dxwe qw d qa dscw edxqwadcsa Das dasxasdxa sdwqdqwa dqwdf rewrdwefwedwqed wdqwd wdwfe ewd wt54 tr23wr wfe fwed wef erf',
      createdAt: new Date
    });
  }
}
