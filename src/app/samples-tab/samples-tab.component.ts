import { Component } from '@angular/core';

import { ConsolodatedViewerComponent } from '../consolodated-viewer/consolodated-viewer.component';

@Component({
  selector: 'app-samples-tab',
  standalone: true,
  imports: [ConsolodatedViewerComponent],
  templateUrl: './samples-tab.component.html',
})
export class SamplesTabComponent {}
