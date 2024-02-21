import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectComponent } from './device-select.component';

describe('DeviceSelectComponent', () => {
  let component: DeviceSelectComponent;
  let fixture: ComponentFixture<DeviceSelectComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
