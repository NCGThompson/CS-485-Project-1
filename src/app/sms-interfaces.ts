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
        value?: string, // From the XML value of the DataItem
    ){
        this.timestamp = timestamp;
        this.type = type;
        this.subType = subType;
        this.name = name;
        this.id = id;
        this.sequence = sequence;
        this.value = value;
    }

    static readonly fieldNames = [
        "Timestamp",
        "Type",
        "Sub Type",
        "Name",
        "Id",
        "Sequence",
        "Value",
    ]

    // for convenience and so changes here are reflected elsewhere
    getFieldValues(): string[] {
        return [
            this.timestamp || "",
            this.type || "",
            this.subType || "",
            this.name || "",
            this.id || "",
            this.sequence || "",
            this.value || "",
        ];
    }
}

export interface SMSComponentInterface {
    componentId: string,
    component?: string,
    name?: string,

    categories?: {
        name: string;
        values?: SMSDataItemInterface[];
    }[];
}

export interface SMSDeviceInterface {
    name?: string;
    uuid?: string;

    components?: SMSComponentInterface[];
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

