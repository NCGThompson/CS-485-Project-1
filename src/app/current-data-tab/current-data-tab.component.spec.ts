import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDataTabComponent } from './current-data-tab.component';

describe('CurrentDataTabComponent', () => {
  let component: CurrentDataTabComponent;
  let fixture: ComponentFixture<CurrentDataTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentDataTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentDataTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
