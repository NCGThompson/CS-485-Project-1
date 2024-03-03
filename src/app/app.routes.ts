import { Routes } from '@angular/router';
import { CurrentDataTabComponent } from './current-data-tab/current-data-tab.component';
import { SamplesTabComponent } from './samples-tab/samples-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

export const routes: Routes = [
  { path: '', component: CurrentDataTabComponent },
  { path: 'sample', component: SamplesTabComponent },
  { path: 'setting', component: SettingsTabComponent },
];
