import { PickerData } from './picker.interface';
import { EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
export abstract class PickerComponent {
    protected static config: any;
    protected date: Date;
    protected okText: string;
    protected cancelText: string;
    protected min: Date;
    protected max: Date;
    protected callback: EventEmitter<string | Date>;
    protected hClasses: any[] = [];
    protected dClasses: any[] = [];
    protected full: boolean = false;
    protected today: Date = new Date();
    protected selectedDate: Date = new Date();
    protected tempDate: Date;
    constructor(protected data: PickerData, protected viewCtrl: ViewController) {
        this.callback = data.changed;
        this.min = data.min;
        this.max = data.max;
        this.hClasses = data.hclasses || [];
        this.dClasses = data.dclasses || [];
        this.okText = data.okText || 'OK';
        this.cancelText = data.cancelText || 'Cancel';
        this.initialize();
    }

    protected abstract ngAfterViewChecked(): void;
    protected abstract createDateList(selectedDate: Date): void;
    protected abstract isActualDate(date: Date): boolean;
    protected abstract isSelectedDate(date: Date): boolean;
    protected abstract selectDate(date: Date): void;


    protected initialize(): void {
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
    }


    protected isDefined(date: Date | string): boolean {
        return date !== undefined;
    }

    protected abstract isDisabled(date: Date): boolean;

    public onCancel(e: Event) {
        if (this.date)
            this.selectedDate = this.date || new Date();
        this.callback.emit(this.selectedDate);
        this.viewCtrl.dismiss();
    };

    public onDone(e: Event) {
        this.date = this.selectedDate;
        this.callback.emit(this.date);
        this.viewCtrl.dismiss();
    };
}