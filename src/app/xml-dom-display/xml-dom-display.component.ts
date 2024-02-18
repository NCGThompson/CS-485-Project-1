import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SMSComponentInterface, SMSDataItemInterface } from '../sms-interfaces';
import { ComponentDisplayComponent } from '../component-display/component-display.component';

// Right now this component isn't very useful, but we will change that.
// It uses component-display to render the third ComponentStream node in the input DOM.
@Component({
  selector: 'app-xml-dom-display',
  standalone: true,
  imports: [ComponentDisplayComponent, CommonModule],
  templateUrl: './xml-dom-display.component.html',
  styleUrl: './xml-dom-display.component.css',
})
export class XmlDomDisplayComponent implements OnChanges {
  @Input() xmlDocument?: XMLDocument;
  processedData?: SMSComponentInterface;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['xmlDocument']?.currentValue) {
      // Is question mark necessary?
      this.processedData = this.processXmlDocument(
        changes['xmlDocument'].currentValue
      );
    }
  }

  // For now we are just getting the third Component in the XML
  // and translating it into an SMSComponentInterface instance
  private processXmlDocument(
    xmlDocument: XMLDocument | undefined
  ): SMSComponentInterface | undefined {
    if (!xmlDocument) {
      return undefined;
    }

    const componentStreams =
      xmlDocument.getElementsByTagName('ComponentStream');
    if (!(componentStreams.length >= 7)) {
      return undefined;
    }
    const componentNode = componentStreams.item(6);
    if (!componentNode) {
      return undefined;
    }

    const componentId: string | null =
      componentNode.getAttribute('componentId');
    if (componentId === null) {
      return undefined;
    }
    const out: SMSComponentInterface = {
      componentId: componentId,
      categories: [],
    };
    out.component = componentNode.getAttribute('component') ?? undefined;
    out.name = componentNode.getAttribute('name') ?? undefined;

    for (var category of ['Samples', 'Events', 'Condition']) {
      // Condition is singular
      const values: SMSDataItemInterface[] = [];
      const childElements = componentNode.querySelector(category)?.children;
      if (!childElements) {
        continue;
      }

      const length = childElements.length; // assign for performance
      for (let i = 0; i < length; i++) {
        values.push(SMSDataItemInterface.fromElement(childElements[i]));
      }
      out.categories.push({
        name: category,
        values: values,
      });
    }

    return out;
  }
}
