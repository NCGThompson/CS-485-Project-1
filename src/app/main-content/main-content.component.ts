import { AfterViewInit, Component } from '@angular/core';

import { Portal, ComponentPortal, PortalModule } from '@angular/cdk/portal';

import { CurrentDataTabComponent } from '../current-data-tab/current-data-tab.component';
import { SamplesTabComponent } from '../samples-tab/samples-tab.component';
import { SettingsTabComponent } from '../settings-tab/settings-tab.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CurrentDataTabComponent, SamplesTabComponent, SettingsTabComponent, PortalModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements AfterViewInit {

  selectedPortal!: Portal<CurrentDataTabComponent>;
  componentPortalA!: ComponentPortal<CurrentDataTabComponent>;
  componentPortalB!: ComponentPortal<SettingsTabComponent>;

  constructor() {}

  ngAfterViewInit(): void {
    this.componentPortalA = new ComponentPortal(CurrentDataTabComponent);
    this.componentPortalB = new ComponentPortal(SettingsTabComponent);

    this.selectedPortal = this.componentPortalA;
  }
}
