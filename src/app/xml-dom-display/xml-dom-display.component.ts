import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  SMSComponentInterface,
  SMSDataItemInterface,
  SMSDeviceInterface,
  SMSProcessedFileInterface,
} from '../sms-interfaces/sms-interfaces';

@Component({
  selector: 'app-xml-dom-display',
  standalone: true,
  imports: [],
  templateUrl: './xml-dom-display.component.html',
  styleUrl: './xml-dom-display.component.css',
})
export class XmlDomDisplayComponent implements OnChanges {
  @Input() xmlDocument?: XMLDocument;
  processedData?: SMSProcessedFileInterface;

  selectedComponentName?: string;
  selectedDeviceName?: string;
  selectedComponentEventsIterate: SMSDataItemInterface[] = [];
  selectedComponentConditionIterate: SMSDataItemInterface[] = [];
  selectedComponentSamplesIterate: SMSDataItemInterface[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['xmlDocument']?.currentValue) {
      // Is question mark necessary?
      this.processedData = this.processXmlDocument(
        changes['xmlDocument'].currentValue
      );
    }
  }

  private processXmlDocument(
    xmlDocument: XMLDocument | undefined
  ): SMSProcessedFileInterface | undefined {
    const out: SMSProcessedFileInterface = {
      header: { data: [] },
      devices: [],
    };

    const liveDevices: HTMLCollection | undefined = xmlDocument?.querySelector(
      'MTConnectStreams > Streams'
    )?.children;
    if (!liveDevices) return undefined;
    const deviceElements: Element[] = Array.from(liveDevices);

    for (const deviceElement of deviceElements) {
      const device: SMSDeviceInterface = { components: [] };
      if (deviceElement.tagName != 'DeviceStream') continue;
      device.name = deviceElement.getAttribute('name') ?? undefined;
      device.uuid = deviceElement.getAttribute('uuid') ?? undefined;

      const liveComponents: HTMLCollection = deviceElement?.children;
      if (!liveComponents) return undefined;
      const componentElements: Element[] = Array.from(liveComponents);

      for (const componentElement of componentElements) {
        if (componentElement.tagName !== 'ComponentStream') continue;
        const componentId: string | null =
          componentElement.getAttribute('componentId');
        if (!componentId) continue;
        const component: SMSComponentInterface = {
          componentId: componentId,
          name: componentElement.getAttribute('name') ?? undefined,
          categories: [],
        };

        for (const category of ['Samples', 'Events', 'Condition']) {
          // Condition is singular
          const values: SMSDataItemInterface[] = [];
          const childElements =
            componentElement.querySelector(category)?.children;
          if (!childElements) {
            continue;
          }

          const length = childElements.length; // assign for performance
          for (let i = 0; i < length; i++) {
            values.push(SMSDataItemInterface.fromElement(childElements[i]));
          }

          component.categories.push({
            name: category,
            values: values,
          });
        }
        device.components.push(component);
      }
      out.devices.push(device);
    }
    return out;
  }

  openDeviceComponent(
    device: SMSDeviceInterface,
    component: SMSComponentInterface
  ) {
    console.log('component', component);
    this.selectedComponentEventsIterate = [];
    this.selectedComponentConditionIterate = [];
    this.selectedComponentConditionIterate = [];
    this.selectedDeviceName = device.name;
    this.selectedComponentName = component.name;
    component.categories.forEach(category => {
      if (category.name === 'Samples' && category.values.length > 0) {
        this.selectedComponentSamplesIterate = category.values;
      } else if (category.name === 'Events' && category.values.length > 0) {
        this.selectedComponentEventsIterate = category.values;
      } else if (category.name === 'Condition' && category.values.length > 0) {
        this.selectedComponentConditionIterate = category.values;
      }
    });

    console.log('goodResponse', this.selectedComponentEventsIterate);
    console.log('goodResponse1', this.selectedComponentSamplesIterate);
    console.log('goodResponse2', this.selectedComponentConditionIterate);
  }

  SMSDataItemInterface = SMSDataItemInterface;
}
