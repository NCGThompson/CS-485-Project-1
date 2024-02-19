import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { XmlDomDisplayComponent } from './xml-dom-display.component';

import xmlText1 from 'raw-loader!../../assets/test-data/current.xml';
import xmlText2 from 'raw-loader!../../assets/test-data/sample.xml';

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

  it('should render current data', () => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlText1, 'text/xml');
    component.xmlDocument = dom;

    component.ngOnChanges({
      ['xmlDocument']: new SimpleChange(undefined, dom, false),
    });
    fixture.detectChanges();
    const componentElement = fixture.nativeElement as HTMLElement;
    for (const a of [
      'xml-dom-display works!',
      'PathFeedrateOverride',
      'Timestamp',
      '2024-02-13T04:00:56.979169',
      '248496697',
    ]) {
      expect(componentElement.textContent).toContain(a);
    }
  });

  it('should render sample data', () => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlText2, 'text/xml');
    component.xmlDocument = dom;

    component.ngOnChanges({
      ['xmlDocument']: new SimpleChange(undefined, dom, false),
    });
    fixture.detectChanges();
    const componentElement = fixture.nativeElement as HTMLElement;
    for (const a of [
      'Linear : Z',
      'Timestamp',
      '2024-02-16T11:33:09.624245',
      '251242059',
      'Samples',
    ]) {
      expect(componentElement.textContent).toContain(a);
    }
  });
});
