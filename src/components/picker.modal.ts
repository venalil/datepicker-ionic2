import { Injectable } from '@angular/core';
import { App, ModalOptions, NavOptions, ViewController, ModalCmp } from 'ionic-angular';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { TimePickerComponent } from './timepicker/timepicker.component';
import { AppPortal } from 'ionic-angular/components/app/app-root';
/**
 * @private
 */
export class PickerDisplayer extends ViewController {
    private _app: App;
    private _enterAnimation: string;
    private _leaveAnimation: string;

    constructor(app: App, data: any) {

        // data.opts = opts;

        super(ModalCmp, data, null);
        this._app = app;
        this._enterAnimation = data.opts.enterAnimation;
        this._leaveAnimation = data.opts.leaveAnimation;

        this.isOverlay = true;
    }

    /**
     * @private
     */
    getTransitionName(direction: string): string {
        let key: string;
        if (direction === 'back') {
            if (this._leaveAnimation) {
                return this._leaveAnimation;
            }
            key = 'modalLeave';
        } else {
            if (this._enterAnimation) {
                return this._enterAnimation;
            }
            key = 'modalEnter';
        }
        return this._nav && this._nav.config.get(key);
    }

    /**
     * Present the action sheet instance.
     *
     * @param {NavOptions} [opts={}] Nav options to go with this transition.
     * @returns {Promise} Returns a promise which is resolved when the transition has completed.
     */
    present(navOptions: NavOptions = {}) {
        return this._app.present(this, navOptions, AppPortal.MODAL);
    }
}
@Injectable()
export class PickerController {

    constructor(private _app: App) { }
    /**
     * Create a date modal to display. See below for options.
     *
     * @param {object} data Any data to pass to the Modal view
     * @param {object} opts Modal options
     */
    createDatePicker(data: any = {}, opts: ModalOptions = {}) {
        data.component = DatePickerComponent;
        opts.showBackdrop = opts.showBackdrop !== undefined ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = opts.enableBackdropDismiss !== undefined ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        return new PickerDisplayer(this._app, data);
    }
     /**
     * Create a date modal to display. See below for options.
     *
     * @param {object} data Any data to pass to the Modal view
     * @param {object} opts Modal options
     */
    createTimePicker(data: any = {}, opts: ModalOptions = {}) {
        data.component = TimePickerComponent;
        opts.showBackdrop = opts.showBackdrop !== undefined ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = opts.enableBackdropDismiss !== undefined ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        return new PickerDisplayer(this._app, data);
    }
}
