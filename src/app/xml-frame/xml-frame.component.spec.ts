import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlFrameComponent } from './xml-frame.component';

describe('XmlFrameComponent', () => {
  let component: XmlFrameComponent;
  let fixture: ComponentFixture<XmlFrameComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmlFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say it works', () => {
    expect(compiled.querySelector('p')?.textContent).toEqual('xml-frame works!');
  });

  it('should have an iframe with the right url', () => {
    expect(compiled.querySelector('iframe')).toBeTruthy;
    expect(compiled.querySelector('iframe')?.attributes.getNamedItem('src')?.value)
      .toEqual('https://smstestbed.nist.gov/vds/current');
  });
});
