export interface PickerData {
    min?: Date;
    max?: Date;
    changed: any;
    hclasses?: Array<string>;
    dclasses?: Array<string>;
    full?: boolean;
    okText: string;
    cancelText: string;
}