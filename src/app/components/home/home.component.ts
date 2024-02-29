import { Component } from '@angular/core';

import { ConsolodatedViewerComponent } from '../consolodated-viewer/consolodated-viewer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ConsolodatedViewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
