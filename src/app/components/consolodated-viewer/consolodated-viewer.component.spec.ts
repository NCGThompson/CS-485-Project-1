import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolodatedViewerComponent } from './consolodated-viewer.component';

describe('ConsolodatedViewerComponent', () => {
  let component: ConsolodatedViewerComponent;
  let fixture: ComponentFixture<ConsolodatedViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolodatedViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolodatedViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
