import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SMSComponentInterface,
  SMSDataItemInterface,
  SMSDeviceInterface,
  SMSProcessedFileInterface,
} from '../sms-interfaces/sms-interfaces';
import { ComponentDisplayComponent } from '../component-display/component-display.component';

@Component({
  selector: 'app-xml-dom-display',
  standalone: true,
  imports: [ComponentDisplayComponent, CommonModule],
  templateUrl: './xml-dom-display.component.html',
  styleUrl: './xml-dom-display.component.css',
})
export class XmlDomDisplayComponent implements OnChanges {
  @Input() xmlDocument?: XMLDocument;
  processedData?: SMSProcessedFileInterface;

  selectedComponentName: any;
  selectedComponentSamples: any;
  selectedComponentEvents: any = {};
  selectedComponentCondition: any;
  selectedDeviceName: any;
  selectedComponentEventsIterate: any;
  selectedComponentConditionIterate: any;
  selectedComponentSamplesIterate: any;

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
        this.selectedComponentSamples = category.values;
      } else if (category.name === 'Events' && category.values.length > 0) {
        this.selectedComponentEvents = category.values;
      } else if (category.name === 'Condition' && category.values.length > 0) {
        this.selectedComponentCondition = category.values;
      }
    });
    // // for event
    // if (this.selectedComponentEvents) {
    //   const evilResponseProps = Object.keys(this.selectedComponentEvents);
    //   this.selectedComponentEventsIterate = [];
    //   for (const prop of evilResponseProps) {
    //     this.selectedComponentEventsIterate.push(
    //       this.selectedComponentEvents[prop]
    //     );
    //   }
    // }

    // // for sample
    // if (this.selectedComponentSamples) {
    //   const evilResponseProps1 = Object.keys(this.selectedComponentSamples);
    //   this.selectedComponentSamplesIterate = [];
    //   for (const prop of evilResponseProps1) {
    //     this.selectedComponentSamplesIterate.push(
    //       this.selectedComponentSamples[prop]
    //     );
    //   }
    // }

    // // for condition
    // if (this.selectedComponentCondition) {
    //   const evilResponseProps2 = Object.keys(this.selectedComponentCondition);
    //   this.selectedComponentConditionIterate = [];
    //   for (const prop of evilResponseProps2) {
    //     this.selectedComponentConditionIterate.push(
    //       this.selectedComponentCondition[prop]
    //     );
    //   }
    // }

    // Function to transform SMSDataItemInterface instance to a simpler object
    function transformDataItem(
      dataItem: SMSDataItemInterface
    ): { key: string; value: string }[] {
      const valueArray = dataItem.getFieldValues();
      return SMSDataItemInterface.fieldNames.map((key, index) => ({
        key,
        value: valueArray[index],
      }));
    }

    // Transform each selected component data item
    this.selectedComponentEventsIterate =
      this.selectedComponentEvents?.map(transformDataItem) || [];
    this.selectedComponentSamplesIterate =
      this.selectedComponentSamples?.map(transformDataItem) || [];
    this.selectedComponentConditionIterate =
      this.selectedComponentCondition?.map(transformDataItem) || [];

    //this.makeIterables();

    console.log('goodResponse', this.selectedComponentEventsIterate);
    console.log('goodResponse1', this.selectedComponentSamplesIterate);
    console.log('goodResponse2', this.selectedComponentConditionIterate);
  }

  private makeIterables() {
    // Assuming this.selectedComponentEvents is an array of SMSDataItemInterface instances
    if (this.selectedComponentEvents) {
      this.selectedComponentEventsIterate = this.selectedComponentEvents.map(
        (item: SMSDataItemInterface) => ({
          _: item.name, // Using the name property for the display name of each item
          $: {
            Timestamp: item.timestamp,
            Type: item.type,
            SubType: item.subType,
            Name: item.name,
            Id: item.id,
            Sequence: item.sequence,
            Value: item.value,
          },
        })
      );
    } else {
      this.selectedComponentEventsIterate = [];
    }

    // Repeat the process for samples and conditions with appropriate adjustments if needed
    if (this.selectedComponentSamples) {
      this.selectedComponentSamplesIterate = this.selectedComponentSamples.map(
        (item: SMSDataItemInterface) => ({
          _: item.name, // Using the name property for the display name of each item
          $: {
            Timestamp: item.timestamp,
            Type: item.type,
            SubType: item.subType,
            Name: item.name,
            Id: item.id,
            Sequence: item.sequence,
            Value: item.value,
          },
        })
      );
    } else {
      this.selectedComponentSamplesIterate = [];
    }

    if (this.selectedComponentCondition) {
      this.selectedComponentConditionIterate =
        this.selectedComponentCondition.map((item: SMSDataItemInterface) => ({
          _: item.name, // Using the name property for the display name of each item
          $: {
            Timestamp: item.timestamp,
            Type: item.type,
            SubType: item.subType,
            Name: item.name,
            Id: item.id,
            Sequence: item.sequence,
            Value: item.value,
          },
        }));
    } else {
      this.selectedComponentConditionIterate = [];
    }
  }
}
