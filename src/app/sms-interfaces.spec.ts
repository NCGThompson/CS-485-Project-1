import { SMSDataItemInterface } from "./sms-interfaces";

describe('SMSDataItemInterface', () => {
  it('should create an empty instance', () => {
    expect(new SMSDataItemInterface()).toBeTruthy();
  });

  it('should create a partly empty instance', () => {
    let instance = new SMSDataItemInterface('timestamp');
    expect(instance).toBeTruthy();
    expect(instance.timestamp).toEqual('timestamp');
    expect(instance.name).toEqual(undefined);
  });

  it('should convert a partly empty instance to an array', () => {
    let instance = new SMSDataItemInterface('timestamp');
    let arr = instance.getFieldValues();
    expect(arr.length).toEqual(7)
    expect(arr[0]).toEqual('timestamp');
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i]).toEqual('');
    }
  });

  it('should have correct field names defined', () => {
    expect(SMSDataItemInterface.fieldNames).toEqual([
        "Timestamp",
        "Type",
        "Sub Type",
        "Name",
        "Id",
        "Sequence",
        "Value"
    ]);
  });
});

describe('strictCheck', () => {
  let instance: SMSDataItemInterface;

  beforeEach(() => {
    instance = new SMSDataItemInterface(
      '2023-05-04T16:20:07.789848Z',  // Timestamp
      'type',                         // Type
      undefined,                      // Sub Type
      '',                             // Name
      'noWhitespace',                 // Id
      '123',                          // Sequence
      ''                              // Value
    );
  });

  it('should return false if timestamp is missing or invalid', () => {
    expect(instance.strictCheck()).toBeTrue();

    instance.timestamp = 'invalid-format';
    expect(instance.strictCheck()).toBeFalse();

    instance.timestamp = undefined;
    expect(instance.strictCheck()).toBeFalse();
  });

  it('should return false if type is missing', () => {
    expect(instance.strictCheck()).toBeTrue();

    instance.type = undefined;
    expect(instance.strictCheck()).toBeFalse();
  });

  it('should return false if id is missing or contains whitespace', () => {
    expect(instance.strictCheck()).toBeTrue();

    instance.id = 'has whitespace';
    expect(instance.strictCheck()).toBeFalse();

    instance.id = undefined;
    expect(instance.strictCheck()).toBeFalse();
  });

  it('should return false if sequence is missing or not a decimal integer', () => {
    expect(instance.strictCheck()).toBeTrue();

    instance.sequence = 'invalid';
    expect(instance.strictCheck()).toBeFalse();

    instance.sequence = undefined;
    expect(instance.strictCheck()).toBeFalse();
  });

  it('should return true if optional parameters are undefined or empty string', () => {
    expect(instance.strictCheck()).toBeTrue();

    instance.subType = 'someSubType';
    expect(instance.strictCheck()).toBeTrue();

    instance.name = 'someName';
    expect(instance.strictCheck()).toBeTrue();

    instance.value = 'someValue';
    expect(instance.strictCheck()).toBeTrue();
  });
});
