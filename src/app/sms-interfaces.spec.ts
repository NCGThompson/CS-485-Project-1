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
