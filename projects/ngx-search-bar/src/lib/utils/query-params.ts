import { NgxFilterValue } from "../interfaces/structures";


export function getWindow(): Window {
    console.log('getWindow()');
    return window;
}

export function changeQueryParamsUrl(obj: { [key: string]: NgxFilterValue }): void {
    const params = new URLSearchParams('')
    Object.keys(obj).forEach((key) => {
        params.set(key, obj[key] as any);
    });
    getWindow()
    .history.replaceState({}, '', `${getWindow().location.pathname}?${params.toString()}`);
}

export function convertStringQueryParamsToObject(): { [key: string]: string | string[] } | null {
    const path = window.location.search;
    if (!path) return null;

    let arr = path.replace('?', '').split('&')
    const res = arr.reduce((acc: any, curr, index) => {
      const aux: any = curr.split('=')
      if (!aux[1] ) {
        return acc;
      }

      if (acc[aux[0]]) {
        if (Array.isArray(acc[aux[0]])) {
          acc[aux[0]] = [...acc[aux[0]], aux[1]]
        } else {
          acc[aux[0]] = [acc[aux[0]], aux[1]]
        }
      } else {
        acc[aux[0]] = aux[1];
      }
      return acc;
    }, {})
    return JSON.parse(JSON.stringify(res));
}
