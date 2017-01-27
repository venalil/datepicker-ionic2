import { App, ModalOptions, ViewController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from "@angular/core";

import { PickerController } from '../picker.modal';
import { TimePickerData } from './timepicker.interface';
import { DatePipe } from "@angular/common";
import { DateService } from '../picker.service';

@Directive({
    selector: 'ion-timepicker,[ion-timepicker]',
})
export class TimePickerDirective {
    @Output('ionChanged') public changed: EventEmitter<string | Date> = new EventEmitter<string | Date>();
    @Input() public max: Date;
    @Input() public min: Date;
    @Input() public full: boolean;
    @Input() public okText: string;
    @Input() public cancelText: string;

    @Input() public dclasses: Array<string>;
    @Input() public hclasses: Array<string>;
    @Input() public modalOptions: ModalOptions;
    @Input() public value: Date = new Date();
    private _fn: any;
    constructor(public datepickerCtrl: PickerController, public dateService: DateService) {
        this.changed.subscribe((d: Date) => {
            console.log(d);
            this.value = d;
        });
    }

    @HostListener('click', ['$event'])
    _click(ev: UIEvent) {
        this.open();
    }

    public open() {
        const data = <TimePickerData>{
            min: this.min,
            max: this.max,
            full: this.full,
            dclasses: this.dclasses,
            hclasses: this.hclasses,
            changed: this.changed,
            date: this.value,
            okText: this.okText,
            cancelText: this.cancelText
        }
        let modal = this.datepickerCtrl.createTimePicker(data, this.modalOptions);
        modal.present();
    }
}
