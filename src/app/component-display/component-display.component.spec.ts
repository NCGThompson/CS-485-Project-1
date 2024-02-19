import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as SMSInterfaceExampleData from '../sms-interfaces/sms-interfaces.examples';
import { ComponentDisplayComponent } from './component-display.component';

describe('SMSComponentDisplayComponent', () => {
  let component: ComponentDisplayComponent;
  let fixture: ComponentFixture<ComponentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display category names', () => {
    component.component = SMSInterfaceExampleData.smsComponent1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('1234561');
  });

  it('should display data items', () => {
    component.component = SMSInterfaceExampleData.smsComponent2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('21234572');
  });
});
