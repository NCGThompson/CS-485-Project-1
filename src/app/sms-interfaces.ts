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

export namespace SMSInterfaceExampleData {
  // Example instances for testing purposes

  // Example SMSDataItemInterface instances
  export const smsDataItem1: SMSDataItemInterface = new SMSDataItemInterface(
    '2024-02-15T12:00:00',
    'Type1',
    'Sub Type1',
    'Example Name1',
    '123456',
    '1',
    'Example Value1'
  );

  export const smsDataItem2: SMSDataItemInterface = new SMSDataItemInterface(
    '2024-02-15T12:00:00',
    'Type2',
    'Sub Type2',
    undefined, // setting name as undefined
    '123457',
    '2',
    'Example Value2'
  );

  // Example SMSComponentInterface instances
  export const smsComponent1: SMSComponentInterface = {
    componentId: 'component123',
    component: 'Example Component1',
    name: 'Component Name1',
    categories: [
      {
        name: 'Category Name1',
        values: [smsDataItem1],
      },
    ],
  };

  export const smsComponent2: SMSComponentInterface = {
    componentId: 'component456',
    component: 'Example Component2',
    name: 'Component Name2',
    categories: [
      {
        name: 'Category Name2',
        values: [smsDataItem2],
      },
      {
        name: 'Category Name3',
        values: [],
      },
    ],
  };

  // Example SMSDeviceInterface instances
  export const smsDevice1: SMSDeviceInterface = {
    name: 'Device Name1',
    uuid: 'device123',
    components: [smsComponent1],
  };

  export const smsDevice2: SMSDeviceInterface = {
    name: 'Device Name2',
    uuid: 'device456',
    components: [smsComponent2],
  };

  // Example SMSHeaderInterface instances
  export const smsHeader1: SMSHeaderInterface = {
    data: [
      { name: 'HeaderName1', value: 'HeaderValue1' },
      { name: 'HeaderName2', value: 'HeaderValue2' },
    ],
  };

  export const smsHeader2: SMSHeaderInterface = {
    data: [
      { name: 'HeaderName3', value: 'HeaderValue3' },
      { name: 'HeaderName4', value: 'HeaderValue4' },
    ],
  };

  // Example SMSProcessedFileInterface instances
  export const smsProcessedFile1: SMSProcessedFileInterface = {
    header: smsHeader1,
    devices: [smsDevice1],
  };

  export const smsProcessedFile2: SMSProcessedFileInterface = {
    header: smsHeader2,
    devices: [smsDevice2],
  };

  // Output the example instances
  // console.log(smsDataItem1);
  // console.log(smsDataItem2);
  // console.log(smsComponent1);
  // console.log(smsComponent2);
  // console.log(smsDevice1);
  // console.log(smsDevice2);
  // console.log(smsHeader1);
  // console.log(smsHeader2);
  // console.log(smsProcessedFile1);
  // console.log(smsProcessedFile2);
}
