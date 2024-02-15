import { Component } from '@angular/core';
import { ComponentDisplayComponent } from '../component-display/component-display.component';
import { SMSInterfaceExampleData } from '../sms-interfaces';

@Component({
  selector: 'app-samples-tab',
  standalone: true,
  imports: [ ComponentDisplayComponent ],
  templateUrl: './samples-tab.component.html'
})
export class SamplesTabComponent {
  exampleComponent = SMSInterfaceExampleData.smsComponent1;
}
