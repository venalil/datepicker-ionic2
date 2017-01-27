import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { timepicker_style } from './timepicker.component.style';
import { timepicker_markup } from './timepicker.component.markup';
import { PickerComponent } from '../picker.component';
@Component({
    template: timepicker_markup,
    styles: [timepicker_style],
    encapsulation: ViewEncapsulation.Emulated,
})

export class TimePickerComponent extends PickerComponent {
    public hours: string[];
    public minutes: string[];
    @ViewChild('minutescroll') private minutescroll: ElementRef;
    @ViewChild('hourscroll') private hourscroll: ElementRef;
    constructor(viewCtrl: ViewController, navParams: NavParams) {
        super(navParams.data, viewCtrl);
    }

    protected ngAfterViewChecked(): void {
        if (this.hourscroll)
            this.hourscroll.nativeElement.scrollTop = this.selectedDate.getHours() * (this.hourscroll.nativeElement.scrollHeight / this.hours.length);
        if (this.minutescroll)
            this.minutescroll.nativeElement.scrollTop = this.selectedDate.getMinutes() * (this.minutescroll.nativeElement.scrollHeight / this.minutes.length);
    }


    protected createDateList(selectedDate: Date): void {
    }

    protected isDisabled(date: Date): boolean {
        if (!date) return true;
        if (this.min) {
            if (date < this.min) return true;
        }
        if (this.max) {
            if (date > this.max) return true;
        }
        return false;
    }

    protected selectDate(date: Date) {
        if (this.isDisabled(date)) return;
        this.selectedDate = date;
        this.tempDate = this.selectedDate;
    }

    protected isActualDate(date: Date): boolean {
        return true;
    }

    protected isSelectedDate(date: Date): boolean {
        return true;
    }
}