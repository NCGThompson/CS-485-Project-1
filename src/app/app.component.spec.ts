import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Project-1' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Project-1');
  });

  it('should render tab', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mdc-tab__text-label')?.textContent).toContain('Current Data');
  });

  it('should render "current-data-tab works!"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('current-data-tab works!');
  });

  it('should NOT INITIALLY render "samples-tab works!"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p');
    
    paragraphs.forEach(paragraph => {
      expect(paragraph.textContent).not.toContain('samples-tab works!');
    });
  });
});
