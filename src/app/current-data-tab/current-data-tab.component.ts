import { Component } from '@angular/core';

import { ConsolodatedViewerComponent } from '../consolodated-viewer/consolodated-viewer.component';

@Component({
  selector: 'app-current-data-tab',
  standalone: true,
  imports: [ConsolodatedViewerComponent],
  templateUrl: './current-data-tab.component.html',
})
export class CurrentDataTabComponent {}
