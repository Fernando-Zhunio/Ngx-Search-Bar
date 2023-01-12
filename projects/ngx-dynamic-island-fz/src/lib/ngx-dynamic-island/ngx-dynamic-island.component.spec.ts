import { ComponentFixture, TestBed } from '@angular/core/testing';
import  { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDynamicIslandComponent } from './ngx-dynamic-island.component';
import { NgxDynamicIslandService } from 'ngx-dynamic-island-fz';

describe('NgxDynamicIslandComponent', () => {
  let component: NgxDynamicIslandComponent;
  let fixture: ComponentFixture<NgxDynamicIslandComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicIslandComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        NgxDynamicIslandService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Generate Css Position', () => {
    expect(component.generateCssPosition).toBeTruthy();
    expect(component.generateCssPosition('bottom-center')).toEqual('bottom: 0; left: 50%; transform: translateX(-50%);');
    expect(component.generateCssPosition('bottom-left')).toEqual('bottom: 0; left: 0;');
  })

  // it('actionExecute', () => {
  //   expect(component.actionExecute).toBeTruthy();
  //   (component as any).dis.show({
  //     title: 'Test',
  //     action: 'download',
  //     pathOrUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  //     content: 'lorem loremxa XASC ASC SDC SD SAC AXCS C XA Za dxwe qw d qa dscw edxqwadcsa Das dasxasdxa sdwqdqwa dqwdf rewrdwefwedwqed wdqwd wdwfe ewd wt54 tr23wr wfe fwed wef erf',
  //     createdAt: new Date
  //   });
  // })
});


