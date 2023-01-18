import { TestBed } from '@angular/core/testing';
import  * as Params  from './query-params';

describe('QueryParams Class', () => {

    const windowObject = {
        location: { href: 'http://localhost:4200', params: 'http://localhost:4200' },
        history: { replaceState: (a: any, b: any, c: any) => { 
            console.log('replaceState', a, b, c);
            window().location.href = c; } }
    }

    const window = () => {
        return windowObject
    };

    beforeEach(async () => {
        // let url = 'http://localhost:4200/?q=hello&sort=asc';

    });

    it('should create', () => {
        jasmine.createSpy('getWindow').and.callFake(window as any);
        Params.changeQueryParamsUrl({ q: 'hello', sort: 'asc' });
        expect(window().location.href).toBe('http://localhost:4200/?q=hello&sort=asc');
    });

});
