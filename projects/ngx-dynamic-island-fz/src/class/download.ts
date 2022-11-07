import { HttpClient, HttpEventType } from "@angular/common/http";

export class Download {
    constructor(private http: HttpClient) { }
    percentDownload = 0;
    downloadFile(url: string, fileName = 'file_fz', callbackEndDownload: Function | null = null) {
        this.percentDownload = 0;
        return this.http.get(url, {
            responseType: 'blob',
            reportProgress: true,
            observe: 'events'
        }).subscribe((event: any) => {
            switch (event.type) {
                case HttpEventType.Sent:
                    break;
                case HttpEventType.ResponseHeader:
                    break;
                case HttpEventType.DownloadProgress:
                    this.percentDownload = Math.round(event.loaded / event.total * 100);
                    break;
                case HttpEventType.Response:
                    const blob = new Blob([event.body], { type: 'application/ms-Excel' });
                    const urlDownload = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    document.body.appendChild(a);
                    a.setAttribute('style', 'display: none');
                    a.href = urlDownload;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(urlDownload);
                    a.remove();
                    callbackEndDownload && callbackEndDownload();
            }
        }, () => {
        });
    }
}