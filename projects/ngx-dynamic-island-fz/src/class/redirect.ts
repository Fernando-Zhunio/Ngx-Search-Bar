import { Router } from "@angular/router";

export class Redirect {
    constructor(private router: Router) { }
    redirectTo(prePath: string) {
        const { path, queryParams } = this.generatePathAndQueryParams(prePath);
        if (this.router.url !== path) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate([path], { queryParams }));
        }
    }

    generatePathAndQueryParams(prePath: string): { path: string, queryParams: any } {
        console.log(prePath);
        const urlOutHash = prePath.replace('#/', '');
        const urlObject: any = new URL(urlOutHash);
        const path = urlObject.pathname;
        const queryStrings = Array.from(urlObject.searchParams.entries());
        const queryParams: any = {};
        if (queryStrings.length > 0) {
          queryStrings.forEach((item: any) => {
            queryParams[item[0]] = item[1];
          });
        }
        return { path, queryParams };
      }
}