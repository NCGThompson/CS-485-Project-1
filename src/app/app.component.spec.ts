import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

// import { HarnessLoader } from '@angular/cdk/testing';
// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { MatTabGroupHarness } from '@angular/material/tabs/testing';

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
    expect(compiled.querySelector('button')?.textContent).toContain(
      'Current Data'
    );
  });

  it('should render hidden "current-data-tab works!"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toEqual(
      'current-data-tab works!'
    );
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

  // it('should respond to tab changes', async () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges(); // idk if we need this.
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
  //   const tabGroup = await loader.getHarness(MatTabGroupHarness);

  //   expect((await tabGroup.getTabs()).length).toEqual(3); // There should be 3 tabs.
  //   expect(await (await tabGroup.getSelectedTab()).getLabel()).toContain(
  //     'Current Data'
  //   ); // We should start on the first tab.
  //   expect(compiled.querySelector('p')?.textContent).toEqual('Nist Data');

  //   await tabGroup.selectTab({ label: 'View Samples' }); // Selects the first tab not already selected
  //   expect(await (await tabGroup.getSelectedTab()).getLabel()).toContain(
  //     'View Samples'
  //   );
  //   expect(compiled.querySelectorAll('p')[2]?.textContent).toEqual(
  //     'samples-tab works!'
  //   ); // current-data-tab works! is also in the DOM and I don't know why
  // });
});
