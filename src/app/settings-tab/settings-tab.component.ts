import { Component } from '@angular/core';

import { ReactiveSettingsComponent } from './reactive-settings/reactive-settings.component';

@Component({
  selector: 'app-settings-tab',
  standalone: true,
  imports: [ReactiveSettingsComponent],
  templateUrl: './settings-tab.component.html',
})
export class SettingsTabComponent {}
