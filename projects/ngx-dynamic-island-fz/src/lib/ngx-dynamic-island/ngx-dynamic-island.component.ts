import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Download } from '../../class/download';
import { Redirect } from '../../class/redirect';
import { DynamicIslandNotificationMetadata } from '../../interfaces/dynamic-island';
import { ActionNotification } from '../../types/action';
import { NgxDynamicIslandPosition } from '../../types/position';
import { NgxDynamicIslandService } from '../ngx-dynamic-island.service';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-dynamic-island',
  template: ``
})
export class NgxDynamicIslandContainerComponent implements OnInit {
  constructor(private vcr: ViewContainerRef, private dis: NgxDynamicIslandService) { }
  ngOnInit(): void {
    this.dis.setViewContainerRef(this.vcr);
  }
}


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-dynamic-island-component',
  templateUrl: './ngx-dynamic-island.component.html',
  styleUrls: ['./ngx-dynamic-island.component.scss'],
  animations: [
    trigger('fadeIsland', [
      transition(':leave', [
        animate(200, style({ transform: 'scale(0.2,.7)' })),
      ]),
      transition(':enter', [
        style({ transform: 'scale(0.2,.7)', fontSize: '2%' }),
        animate(200, style({
          transform: 'scale(1)',
          width: '100%',
          fontSize: '100%'
        })),
      ]),
    ])
  ]
})
export class NgxDynamicIslandComponent implements OnInit, OnDestroy {

  @ViewChild('scrollMe') scrollMe!: ElementRef;

  @Input() maxWidthPx: number = 600;
  @Input() position: NgxDynamicIslandPosition = 'bottom-right';
  cssPosition!: string;
  subscripted!: Subscription;
  dynamicIslands: Map<Symbol, DynamicIslandNotificationMetadata> = new Map<Symbol, DynamicIslandNotificationMetadata>();
  download: Download;
  redirect: Redirect;
  constructor(private dis: NgxDynamicIslandService, private router: Router, private http: HttpClient) {
    this.download = new Download(http);
    this.redirect = new Redirect(router);
  }

  ngOnDestroy(): void {
    this.subscripted?.unsubscribe();
  }

  ngOnInit(): void {
    this.cssPosition = this.generateCssPosition(this.position);
    this.subscripted = this.dis.data.subscribe((data) => {
      this.dynamicIslands = data;
    });
  }

  changePosition(position: NgxDynamicIslandPosition) {
    this.position = position;
    this.cssPosition = this.generateCssPosition(position);
  }

  actionExecute(action: ActionNotification, key: any): void {
    const actionData = this.dynamicIslands.get(key)!;
    switch (action) {
      case 'download':
        if (actionData.statusDownload?.status === 'downloading') {
          break;
        }
        actionData.statusDownload = {
          status: 'downloading',
          progress: 0
        };
        this.downloadFile(actionData);
        break;
      case 'redirect':
        new Redirect(this.router).redirectTo(actionData.notification.pathOrUrl!);
    }
  }

  downloadFile(data: DynamicIslandNotificationMetadata) {
    return this.http.get(data.notification.pathOrUrl!, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      {
        next: (event: any) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.DownloadProgress:
              data.statusDownload.progress = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.Response:
              const blob = new Blob([event.body], { type: 'application/ms-Excel' });
              const urlDownload = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display: none');
              a.href = urlDownload;
              a.download = data.notification?.nameFile || 'download';
              a.click();
              window.URL.revokeObjectURL(urlDownload);
              a.remove();
              data.statusDownload.status = 'download-success';
              this.destroyDynamicIsland(data.id);
          }
        },
        error: () => {
          data.statusDownload.status = 'download-error';
        }
      });
  }
  
  destroyDynamicIsland(key: Symbol) {
    this.dis.destroyDynamicIsland(key);
  }

  generateCssPosition(position: NgxDynamicIslandPosition): string {
    switch (position) {
      case 'top-right':
        return 'top: 0; right: 0;';
      case 'bottom-right':
        return 'bottom: 0; right: 0;';
      case 'top-left':
        return 'top: 0; left: 0;';
      case 'bottom-left':
        return 'bottom: 0; left: 0;';
      case 'top-center':
        return 'top: 0; left: 50%; transform: translateX(-50%);';
      case 'bottom-center':
        return 'bottom: 0; left: 50%; transform: translateX(-50%);';
      default:
        return 'top: 0; left: 50%; transform: translateX(-50%);';
    }
  }

  itemTrackBy(_index: number, item: any) {
    return item.key;
  }

  // alwaysBottom() {
  //   try {
  //     this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  //   } catch (err) { }
  // }
}
