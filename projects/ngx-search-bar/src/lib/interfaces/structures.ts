
export type NgxFilterValue = Array<NgxSearchBarFilter |NgxFilterValue> | boolean | string | number | null | undefined;
export type NgxSearchBarFilter = { [key: string]: { friendlyName: string, value: NgxFilterValue } };

