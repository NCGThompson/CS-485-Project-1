/* Our XML input is expected to contain a header with various
metadata, a list of devices with a bit of metadata
and a list of components each of wich contain even more
data. We will need to be able to select and display
separate devices as well as separate components. Optionally,
we can make an angular component that displays the header data. */

export class SMSDataItemInterface {
  timestamp?: string;
  type?: string;
  subType?: string;
  name?: string;
  id?: string;
  sequence?: string;
  value?: string;

  constructor(
    timestamp?: string,
    type?: string, // The field name of the data item
    subType?: string,
    name?: string,
    id?: string,
    sequence?: string,
    value?: string // From the XML value of the DataItem
  ) {
    this.timestamp = timestamp;
    this.type = type;
    this.subType = subType;
    this.name = name;
    this.id = id;
    this.sequence = sequence;
    this.value = value;
  }

  // Takes a DOM element and interprets it as a DataItem
  static fromElement(node: Element) {
    const out = new this();

    out.timestamp = node.getAttribute('timestamp') ?? undefined;
    out.subType = node.getAttribute('subType') ?? undefined;
    out.name = node.getAttribute('name') ?? undefined;
    out.id = node.getAttribute('id') ?? undefined;
    out.sequence = node.getAttribute('sequence') ?? undefined;

    out.type = node.tagName; // correct case only for XML elements not HTML
    out.value = node.textContent || undefined;

    return out;
  }

  static readonly fieldNames = [
    'Timestamp',
    'Type',
    'Sub Type',
    'Name',
    'Id',
    'Sequence',
    'Value',
  ];

  // for convenience and so changes here are reflected elsewhere
  getFieldValues(): string[] {
    return [
      this.timestamp || '',
      this.type || '',
      this.subType || '',
      this.name || '',
      this.id || '',
      this.sequence || '',
      this.value || '',
    ];
  }

  // This makes sure the object is consistent with the inputs we have seen so far.
  // Returning false doesn't necessarily mean the object is invalid.
  strictCheck(): boolean {
    // It should have a timestamp with a certain format
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/;
    if (!this.timestamp || !iso8601Regex.test(this.timestamp)) return false;

    // It should have a sequence number in decimal form
    if (!this.sequence || !/^\d+$/.test(this.sequence)) return false;

    // It should have non-empty id without any white space.
    if (!this.id || !/^\S+$/.test(this.id)) return false;

    // It should have a non-empty type
    if (!this.type) return false;

    return true;
  }
}

export interface SMSComponentInterface {
  componentId: string;
  component?: string;
  name?: string;

  categories: {
    name: string;
    values: SMSDataItemInterface[];
  }[];
}

export interface SMSDeviceInterface {
  name?: string;
  uuid?: string;

  components: SMSComponentInterface[];
}

// Nothing special, just arbitrary XML data
export interface SMSHeaderInterface {
  data: {
    name: string;
    value: string;
  }[];
}

export interface SMSProcessedFileInterface {
  header: SMSHeaderInterface;
  devices: SMSDeviceInterface[];
}
