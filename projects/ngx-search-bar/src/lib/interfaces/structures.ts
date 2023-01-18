
export type NgxFilterValue = Array<NgxFilter |NgxFilterValue> | boolean | string | number | null | undefined;
export type NgxFilter = { [key: string]: { friendlyName: string, value: NgxFilterValue } };

export interface NgxSearchBarPaginateParams {
    length: string;
    pageIndex: string;
    pageSize: string;
}
export type NgxPaginateOptions = {
    disabled?: boolean;
    showFirstLastButtons?: boolean;
    sizeOptions?: number[];
    hidePageSize?: boolean;
    paramsRequest? : NgxSearchBarPaginateParams;
    paramsResponse? : NgxSearchBarPaginateParams;
}