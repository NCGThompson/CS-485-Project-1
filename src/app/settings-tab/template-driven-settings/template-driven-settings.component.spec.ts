import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TemplateDrivenSettingsComponent } from './template-driven-settings.component';

describe('TemplateDrivenSettingsComponent', () => {
  let component: TemplateDrivenSettingsComponent;
  let fixture: ComponentFixture<TemplateDrivenSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDrivenSettingsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDrivenSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
