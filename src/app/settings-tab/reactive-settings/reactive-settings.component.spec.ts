import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveSettingsComponent } from './reactive-settings.component';

describe('ReactiveSettingsComponent', () => {
  let component: ReactiveSettingsComponent;
  let fixture: ComponentFixture<ReactiveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveSettingsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
