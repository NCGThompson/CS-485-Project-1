import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { SettingComponent } from './components/setting/setting.component';

export const routes: Routes = [
  {
    path:'',component:HomeComponent

  },
  {
    path:'sample',component:SampleComponent

  },
  {
    path:'setting',component:SettingComponent

  }
];
