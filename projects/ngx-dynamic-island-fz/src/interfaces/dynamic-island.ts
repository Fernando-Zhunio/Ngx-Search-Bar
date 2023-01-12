import { NgxDynamicIslandAction } from "../types/action";
import { NgxDynamicIslandPosition } from "../types/position";

export type DynamicIslandStatus = 'warning' | 'danger' | 'success' | 'info' | 'light';
export interface DynamicIslandNotificationMetadata extends DynamicIslandInput {
  id?: any;
  statusDownload: {
    status: 'downloading' | 'download-success' | 'download-error' | null
    progress: number
  };
  notification: DynamicIslandNotification;
}
export interface DynamicIslandNotification {
  image?: string;
  nameFile?: string;
  pathOrUrl?: string;
  title?: string;
  content: string;
  createdAt?: Date | string;
  read?: boolean;
}

export interface DynamicIslandInput {
  maxWidthPx?: number;
  position?: NgxDynamicIslandPosition;
  duration?: number;
  status?: DynamicIslandStatus;
  action?: NgxDynamicIslandAction;
}