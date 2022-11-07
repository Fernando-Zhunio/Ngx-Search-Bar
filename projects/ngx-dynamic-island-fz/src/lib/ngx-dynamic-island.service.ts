import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicIslandNotification, DynamicIslandNotificationMetadata } from '../interfaces/dynamic-island';
import { NgxDynamicIslandComponent } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class NgxDynamicIslandService {

  viewContainerRef!: ViewContainerRef;
  openCount = 0;
  component: ComponentRef<NgxDynamicIslandComponent> | null = null;

  data: BehaviorSubject<Map<Symbol, DynamicIslandNotificationMetadata>> = new BehaviorSubject<Map<Symbol, DynamicIslandNotificationMetadata>>(new Map<Symbol, DynamicIslandNotificationMetadata>());
  readonly duration = 4000
  constructor() { }

  show(info: DynamicIslandNotification): any {
    if (!this.component) {
      this.component = this.viewContainerRef.createComponent(NgxDynamicIslandComponent);
    }
    const key = this.addDynamicIslandNotification(info);
    if (info?.action !== 'download') {
      this.deleteForDuration(key);
    }
    return key;
  }

  deleteForDuration(key: Symbol, duration: number = 4000): void {
    setTimeout(() => {
      this.destroyDynamicIsland(key);
    }, duration);
  }

  destroyDynamicIsland(key: Symbol): void {
    const data = this.data.getValue();
    data.delete(key);
    this.data.next(data);
    // if (data.size === 0) {
    //   this.component?.destroy();
    //   this.component = null;
    //   this.viewContainerRef.clear();
    // }
  }

  // setDataComponent(option:{maxWidthPx,position}): void {
  //   this.component?.instance.data = this.data;
  // }

  private addDynamicIslandNotification(option: DynamicIslandNotification, key: any = Symbol()): Symbol {
    const newData: DynamicIslandNotificationMetadata = {
      notification: option,
      id: key,
      duration:  this.duration,
      statusDownload: {
        status: null,
        progress: 0
      }
    }
    const data = this.data.getValue();
    data.set(key, newData);
    this.data.next(data);
    return key;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }
}

