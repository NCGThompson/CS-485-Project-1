import { Component } from '@angular/core';
import { ComponentDisplayComponent } from '../component-display/component-display.component';
import * as SMSInterfaceExampleData from '../sms-interfaces/sms-interfaces.examples';

@Component({
  selector: 'app-samples-tab',
  standalone: true,
  imports: [ComponentDisplayComponent],
  templateUrl: './samples-tab.component.html',
})
export class SamplesTabComponent {
  exampleComponent = SMSInterfaceExampleData.smsComponent1;
}
