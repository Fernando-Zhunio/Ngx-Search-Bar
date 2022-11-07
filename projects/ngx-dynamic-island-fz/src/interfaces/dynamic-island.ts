import { ActionNotification } from "../types/action";
import { NgxDynamicIslandPosition } from "../types/position";

export interface DynamicIslandNotificationMetadata {
    id?: any;
    duration?: number;
    statusDownload:
    {
      status: 'downloading' | 'download-success' | 'download-error' | null
      progress: number
    };
    notification: DynamicIslandNotification;
  }
  export interface DynamicIslandNotification {
      action: ActionNotification;
      image?: string;
      nameFile?: string;
      pathOrUrl?: string;
      title?: string;
      content: string;
      createdAt?: Date | string;
      read?: boolean;
  }
  
  export interface DynamicIslandInput {
    maxWidthPx: number;
    position: NgxDynamicIslandPosition;
  }