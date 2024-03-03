import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesTabComponent } from './samples-tab.component';

describe('SamplesTabComponent', () => {
  let component: SamplesTabComponent;
  let fixture: ComponentFixture<SamplesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplesTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SamplesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hidden "samples-tab works!"', () => {
    const fixture = TestBed.createComponent(SamplesTabComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toEqual(
      'samples-tab works!'
    );
    expect(compiled.querySelector('p')?.hasAttribute('hidden')).toBeTruthy();
  });
});
