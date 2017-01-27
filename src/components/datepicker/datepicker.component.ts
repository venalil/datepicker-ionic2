import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { datepicker_style } from './datepicker.component.style';
import { datepicker_markup } from './datepicker.component.markup';
import { DateService } from '../picker.service';
import { PickerComponent } from '../picker.component';
@Component({
    template: datepicker_markup,
    styles: [datepicker_style],
    encapsulation: ViewEncapsulation.Emulated,
})

export class DatePickerComponent extends PickerComponent {
    public dateList: Date[];
    public weekdays: string[];
    public months: string[];
    public years: string[];
    @ViewChild('dayscroll') private dayscroll: ElementRef;
    @ViewChild('yearscroll') private yearscroll: ElementRef;
    private cols: number[];
    private rows: number[];
    private calendar: boolean;
    private type: 'date' | 'string' | 'year' | 'month' | 'calendar' = 'date';
    private mode: 'calendar' | undefined = 'calendar';
    constructor(private DatepickerService: DateService, viewCtrl: ViewController, navParams: NavParams) {
        super(navParams.data, viewCtrl);
        this.calendar = navParams.data.calendar || false;
        if (this.calendar) this.type = 'calendar';
    }

    protected ngAfterViewChecked(): void {
        if (this.dayscroll && this.type === 'date')
            this.dayscroll.nativeElement.scrollTop = this.selectedDate.getDate() * (this.dayscroll.nativeElement.scrollHeight / this.dateList.length);
        else if (this.yearscroll && this.type === 'year')
            this.yearscroll.nativeElement.scrollTop = (this.selectedDate.getFullYear() - 1900) * (this.yearscroll.nativeElement.scrollHeight / this.getYears().length);
    }

    public getDaysOfWeek(): string[] {
        if (!this.weekdays) {
            this.weekdays = this.DatepickerService.getDaysOfWeek();
        }
        return this.weekdays;
    }

    public getMonths(): string[] {
        if (!this.months) {
            this.months = this.DatepickerService.getMonths();
        }
        return this.months;
    }

    public getYears(): string[] {
        if (!this.years) {
            this.years = this.DatepickerService.getYears();
        }
        return this.years;
    }

    protected createDateList(selectedDate: Date): void {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.round(this.dateList.length / this.cols.length) + 1);
    }

    private getDate(row: number, col: number): Date {
        return this.dateList[row * 7 + col];
    }

    protected isActualDate(date: Date): boolean {
        if (!date) return false;
        return date.getDate() === this.today.getDate() &&
            date.getMonth() === this.today.getMonth() &&
            date.getFullYear() === this.today.getFullYear();
    }

    private isActualMonth(month: number): boolean {
        return month === this.today.getMonth();
    }

    private isActualYear(year: number): boolean {
        return year === this.today.getFullYear();
    }

    protected isSelectedDate(date: Date): boolean {
        if (!date) return false;
        return date.getDate() === this.selectedDate.getDate() &&
            date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear();
    }

    private isSelectedMonth(month: number): boolean {
        return month === this.tempDate.getMonth();
    }

    private isSelectedYear(year: number): boolean {
        return year === this.tempDate.getFullYear();
    }

    public changeType(val: 'date' | 'string' | 'year' | 'month' | 'calendar'): void {
        if (this.type === 'calendar') return;
        this.type = val;
    }

    public showType(val: 'date' | 'string' | 'year' | 'month' | 'calendar'): boolean {
        return this.type === val;
    }

    public selectDate(date: Date): void {
        if (this.isDisabled(date)) return;
        this.selectedDate = date;
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
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

    public selectMonth(month: number): void {
        this.tempDate.setMonth(month);
        if (this.tempDate.getMonth() !== month) {
            this.tempDate.setDate(0);
        }
        this.changeType('date');
        this.selectMonthOrYear();
    }

    public selectYear(year: number): void {
        this.tempDate.setFullYear(year);
        this.changeType('month');
        this.selectMonthOrYear();
    }

    public getSelectedWeekday(): string {
        if (!this.weekdays) this.getDaysOfWeek();
        return this.weekdays[this.selectedDate.getDay()];
    }

    public getSelectedMonth(): string {
        if (!this.months) this.getMonths();
        return this.months[this.selectedDate.getMonth()];
    }

    private getTempMonth(): string {
        if (!this.months) this.getMonths();
        return this.months[this.tempDate.getMonth()];
    }

    private getTempYear(): number {
        return this.tempDate.getFullYear() || this.selectedDate.getFullYear();
    }

    public selectMonthOrYear(): void {

        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate)) return;
        this.selectedDate = this.tempDate;
    }

    public limitTo(arr: Array<string> | string, limit: number): Array<string> | string {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        return (<string>arr).slice(0, limit);
    }

    public nextMonth(): void {
        let testDate: Date = new Date(this.tempDate.getTime());
        testDate.setDate(1);

        if (testDate.getMonth() === 11) {
            testDate.setFullYear(testDate.getFullYear() + 1);
            testDate.setMonth(0);
        }
        else {
            testDate.setMonth(testDate.getMonth() + 1);
        }
        if (!this.max || this.max >= testDate) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    }

    public prevMonth(): void {
        let testDate: Date = new Date(this.tempDate.getTime());
        testDate.setDate(0);
        if (!this.min ||
            (this.min <= testDate)) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    }
}