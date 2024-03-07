import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { CurrentDataTabComponent } from './current-data-tab/current-data-tab.component';
import { SamplesTabComponent } from './samples-tab/samples-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { ComponentPortal, Portal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PortalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  tabSelected: number = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabArray: { label?: string; content?: Portal<any> }[] = [];

  ngOnInit() {
    // This should cause ngOnInit to run for all 3 possible child components
    // even before they are visible
    this.initializeComponents();
  }

  initializeComponents() {
    this.tabArray = [
      {
        label: 'Current Data',
        content: new ComponentPortal(CurrentDataTabComponent),
      },
      {
        label: 'View Sample',
        content: new ComponentPortal(SamplesTabComponent),
      },
      { label: 'Settings', content: new ComponentPortal(SettingsTabComponent) },
    ];
  }
}
