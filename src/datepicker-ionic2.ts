import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    DatePickerComponent,
    DatePickerDirective,
    nls
}
    from './components/datepicker';
import {
    TimePickerComponent,
    TimePickerData,
    TimePickerDirective
}
    from './components/timepicker';
import { DateService } from './components/picker.service';
import { PickerController, PickerDisplayer } from './components/picker.modal';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ViewController } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    exports: [
        DatePickerComponent,
        DatePickerDirective,
        TimePickerComponent,
        TimePickerDirective],
    entryComponents: [DatePickerComponent, TimePickerComponent],
    declarations: [DatePickerComponent, DatePickerDirective, TimePickerComponent, TimePickerDirective],
    providers: [
        DateService,
        nls,
        PickerController],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DatePickerModule {
};
