import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { CurrentDataTabComponent } from './current-data-tab/current-data-tab.component';
import { SamplesTabComponent } from './samples-tab/samples-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CurrentDataTabComponent,
    SamplesTabComponent,
    SettingsTabComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tabSelected: number = 0;
  tabArray = ['Current Data', 'Sample Data', 'Settings'];
}
