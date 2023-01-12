import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicIslandInput, DynamicIslandNotification, DynamicIslandNotificationMetadata } from '../interfaces/dynamic-island';
import { NgxDynamicIslandComponent } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class NgxDynamicIslandService {

  viewContainerRef!: ViewContainerRef;
  openCount = 0;
  component: ComponentRef<NgxDynamicIslandComponent> | null = null;

  data: BehaviorSubject<Map<any, DynamicIslandNotificationMetadata>> = new BehaviorSubject<Map<Symbol, DynamicIslandNotificationMetadata>>(new Map<Symbol, DynamicIslandNotificationMetadata>());
  OPTION_DEFAULT: DynamicIslandInput = {
    duration: 4000,
    maxWidthPx: 600,
    position: 'bottom-right'
  }
  constructor() { }

  setOptions(options: DynamicIslandInput): void {
    if (this.component) {
      this.component.instance.maxWidthPx = options.maxWidthPx || this.OPTION_DEFAULT.maxWidthPx!;
      this.component.instance.position = options.position || this.OPTION_DEFAULT.position!;
    }
  }

  show(info: DynamicIslandNotification, options?: DynamicIslandInput, customKey: any = null): any {
    if (!this.component) {
      this.component = this.viewContainerRef.createComponent(NgxDynamicIslandComponent);
      this.setOptions(options || this.OPTION_DEFAULT);
    }
    const key = this.addDynamicIslandNotification(info, options, customKey);
    if (options?.action !== 'download' || options?.duration) {
      this.deleteForDuration(key, options?.duration);
    }
    return key;
  }

  deleteForDuration(key: Symbol, duration: number | null = null): void {
    setTimeout(() => {
      const data = this.data.getValue();
      if (data.has(key)) {
        this.destroyDynamicIsland(key);
      }
    }, duration || this.OPTION_DEFAULT.duration);
  }

  destroyDynamicIsland(key: Symbol): void {
    const data = this.data.getValue();
    data.delete(key);
    this.data.next(data);
  }

  private addDynamicIslandNotification(info: DynamicIslandNotification, option?: DynamicIslandInput, customKey: any = null): Symbol {
    const newData: DynamicIslandNotificationMetadata = {
      notification: info,
      id: customKey || Symbol(),
      duration: option?.duration || this.OPTION_DEFAULT.duration || 4000,
      statusDownload: {
        status: null,
        progress: 0
      },
      status: option?.status || 'light',
      action: option?.action || 'none'
    }
    const data = this.data.getValue();
    data.set(newData.id, newData);
    this.data.next(data);
    return newData.id;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }
}

