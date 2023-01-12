import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { NgxDynamicIslandService } from './ngx-dynamic-island.service';

describe('NgxDynamicIslandService', () => {
  let service: NgxDynamicIslandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicIslandService);
    (service.viewContainerRef as any) = {
      createComponent: () => { return 'hole' as any }
    }
    // spyOn(service, 'viewContainerRef').and.returnValue({
    //   createComponent: () => { }
    // });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('method show', () => {
    expect(service.show).toBeTruthy();
    service.show(mockData);
    service.show(mockData);
    const mapValue = service.data.getValue();
    expect(mapValue.size).toBe(2);
  })

  it('destroyDynamicIsland', () => {
    expect(service.destroyDynamicIsland).toBeTruthy();
    const key = service.show(mockData);
    let mapValue = service.data.getValue();
    expect(mapValue.size).toBe(1);

    service.destroyDynamicIsland(key);
    mapValue = service.data.getValue();
    expect(mapValue.size).toBe(0);
  })

  it('deleteForDuration', fakeAsync(() => {
    expect(service.deleteForDuration).toBeTruthy();
    service.show(mockData, { duration: 200 });
    tick(210)
    let mapValue = service.data.getValue();
    expect(mapValue.size).toBe(0);
    flush();
  }));
});

const mockData: any = {
  title: 'Test',
  action: 'download',
  pathOrUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  content: 'lorem loremxa XASC ASC SDC SD SAC AXCS C XA Za dxwe qw d qa dscw edxqwadcsa Das dasxasdxa sdwqdqwa dqwdf rewrdwefwedwqed wdqwd wdwfe ewd wt54 tr23wr wfe fwed wef erf',
  createdAt: new Date
}
