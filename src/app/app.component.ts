import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';

import { CurrentDataTabComponent } from './current-data-tab/current-data-tab.component';
import { SamplesTabComponent } from './samples-tab/samples-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabsModule,
    CurrentDataTabComponent,
    SamplesTabComponent,
    SettingsTabComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Project-1';

  
}
