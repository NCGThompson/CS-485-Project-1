import { Component } from '@angular/core';

import { TemplateDrivenSettingsComponent } from './template-driven-settings/template-driven-settings.component';

@Component({
  selector: 'app-settings-tab',
  standalone: true,
  imports: [TemplateDrivenSettingsComponent],
  templateUrl: './settings-tab.component.html',
})
export class SettingsTabComponent {}
