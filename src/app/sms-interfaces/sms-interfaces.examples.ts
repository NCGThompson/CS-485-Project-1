// Example instances for testing purposes

import {
  SMSDataItemInterface,
  SMSComponentInterface,
  SMSDeviceInterface,
  SMSHeaderInterface,
  SMSProcessedFileInterface,
} from './sms-interfaces';

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
