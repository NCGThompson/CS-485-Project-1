import { SMSDataItemInterface } from './sms-interfaces';

describe('SMSDataItemInterface', () => {
  it('should create an empty instance', () => {
    expect(new SMSDataItemInterface()).toBeTruthy();
  });

  it('should create a partly empty instance', () => {
    const instance = new SMSDataItemInterface('timestamp');
    expect(instance).toBeTruthy();
    expect(instance.timestamp).toEqual('timestamp');
    expect(instance.name).toEqual(undefined);
  });

  it('should convert a partly empty instance to an array', () => {
    const instance = new SMSDataItemInterface('timestamp');
    const arr = instance.getFieldValues();
    expect(arr.length).toEqual(7);
    expect(arr[0]).toEqual('timestamp');
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i]).toEqual('');
    }
  });

  it('should have correct field names defined', () => {
    expect(SMSDataItemInterface.fieldNames).toEqual([
      'Timestamp',
      'Type',
      'Sub Type',
      'Name',
      'Id',
      'Sequence',
      'Value',
    ]);
  });

  describe('strictCheck', () => {
    let instance: SMSDataItemInterface;

    beforeEach(() => {
      instance = new SMSDataItemInterface(
        '2023-05-04T16:20:07.789848Z', // Timestamp
        'type', // Type
        undefined, // Sub Type
        '', // Name
        'noWhitespace', // Id
        '123', // Sequence
        '' // Value
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

  describe('fromElement', () => {
    it('should parse AssetChanged element correctly', () => {
      const xml = `<AssetChanged dataItemId="GFAgie01_asset_chg" timestamp="2024-02-13T01:00:05.089753" sequence="248496550" assetType="">UNAVAILABLE</AssetChanged>`;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'application/xml');
      const assetChangedElement = xmlDoc.documentElement;

      const result = SMSDataItemInterface.fromElement(assetChangedElement);

      expect(result).toEqual(jasmine.any(SMSDataItemInterface));
      expect(result.timestamp).toEqual('2024-02-13T01:00:05.089753');
      expect(result.type).toEqual('AssetChanged');
      expect(result.sequence).toEqual('248496550');
      expect(result.value).toEqual('UNAVAILABLE');
    });

    it('should parse Position element correctly', () => {
      const xml = `<Position dataItemId="GFAgie01-X_2" timestamp="2024-02-13T21:16:19.059416" name="Xposition" sequence="249193105" subType="ACTUAL">20.22078</Position>`;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'application/xml');
      const positionElement = xmlDoc.documentElement;

      const result = SMSDataItemInterface.fromElement(positionElement);

      expect(result).toEqual(jasmine.any(SMSDataItemInterface));
      expect(result.timestamp).toEqual('2024-02-13T21:16:19.059416');
      expect(result.type).toEqual('Position');
      expect(result.sequence).toEqual('249193105');
      expect(result.subType).toEqual('ACTUAL');
      expect(result.value).toEqual('20.22078');
    });

    it('should parse Normal element correctly', () => {
      const xml = `<Normal dataItemId="Mazak03-coolant_2" timestamp="2024-02-13T20:43:22.139003" name="coolant_pres" sequence="249169200" type="PRESSURE"></Normal>`;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'application/xml');
      const normalElement = xmlDoc.documentElement;

      const result = SMSDataItemInterface.fromElement(normalElement);

      expect(result).toEqual(jasmine.any(SMSDataItemInterface));
      expect(result.timestamp).toEqual('2024-02-13T20:43:22.139003');
      expect(result.type).toEqual('Normal');
      expect(result.sequence).toEqual('249169200');
      expect(result.name).toEqual('coolant_pres');
      expect(result.value).toBeUndefined(); // Value is not provided in the XML
    });
  });
});
