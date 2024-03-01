import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { XmlDomDisplayComponent } from './xml-dom-display.component';

import xmlText1 from 'raw-loader!../../assets/test-data/current.xml';

describe('XmlDomDisplayComponent', () => {
  let component: XmlDomDisplayComponent;
  let fixture: ComponentFixture<XmlDomDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlDomDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(XmlDomDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component names', () => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlText1, 'text/xml');
    component.xmlDocument = dom;

    component.ngOnChanges({
      ['xmlDocument']: new SimpleChange(undefined, dom, false),
    });
    fixture.detectChanges();
    const componentElement = fixture.nativeElement as HTMLElement;
    for (const a of ['controller_basic', 'hydraulic', 'Hurco01']) {
      expect(componentElement.textContent).toContain(a);
    }
  });
});
