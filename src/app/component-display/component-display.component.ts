import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SMSComponentInterface, SMSDataItemInterface } from '../sms-interfaces'; // Update the path as necessary

@Component({
  selector: 'app-component-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-display.component.html',
  styleUrl: './component-display.component.css',
})
export class ComponentDisplayComponent {
  @Input() component?: SMSComponentInterface;
  SMSDataItemInterface = SMSDataItemInterface;
}
