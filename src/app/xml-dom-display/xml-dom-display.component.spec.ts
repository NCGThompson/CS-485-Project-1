import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlDomDisplayComponent } from './xml-dom-display.component';

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
});
