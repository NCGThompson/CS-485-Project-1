import { Component } from '@angular/core';

import { ComponentDisplayComponent } from '../component-display/component-display.component';
import * as SMSInterfaceExampleData from '../sms-interfaces/sms-interfaces.examples';
import { DeviceSelectComponent } from '../device-select/device-select.component';

@Component({
  selector: 'app-samples-tab',
  standalone: true,
  imports: [ComponentDisplayComponent, DeviceSelectComponent],
  templateUrl: './samples-tab.component.html',
})
export class SamplesTabComponent {
  exampleComponent = SMSInterfaceExampleData.smsComponent1;
}
