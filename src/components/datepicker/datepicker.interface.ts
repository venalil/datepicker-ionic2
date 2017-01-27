import { PickerData } from '../picker.interface';
export interface DatePickerData extends PickerData {
    calendar?: boolean;
    date?: Date;
}