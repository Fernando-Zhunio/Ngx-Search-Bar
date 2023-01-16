
export type NgxFilterValue = Array<NgxFilter> | boolean | string | number | null | undefined;
export type NgxFilter = { [key: string]: { friendlyName: string, value: NgxFilterValue } };

export type NgxPaginateOptions = {
    length: number;
    pageIndex: number;
    pageSize: number;
    disabled?: boolean;
    showFirstLastButtons?: boolean;
    sizeOptions?: number[];
    hidePageSize?: boolean;
    overrideSendPaginateParams : { length: string, pageIndex: string, pageSize: string};
    overrideRecibePaginateParams? : (res: unknown, callback: (length: number, pageIndex: number, pageSize: number) => void) => void;
}