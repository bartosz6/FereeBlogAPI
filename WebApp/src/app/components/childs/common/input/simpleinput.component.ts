import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';

@Component({
    //changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'simple-input',
    templateUrl: 'simpleinput.component.html'
})
export class SimpleInputComponent {
    @Input() type: string;
    @Input() name: string;
    @Input() form: FormGroup;
    @Input() icon?: string;
    @Input() placeholder: string;
    @Input() errorMessages: string[];

    get control(): AbstractControl {
        return this.form.controls[this.name];
    }
    get isTouched(): boolean {
        return this.control.touched;
    }
    get isValid(): boolean {
        return this.control.touched && this.control.valid;
    }
    get isInvalid(): boolean {
        return this.control.touched && !this.control.valid;
    }
    get errors(): string[] {
        if (this.isInvalid)
            return Object.keys(this.control.errors).filter(name => this.control.errors[name]).map(a => this.errorMessages[a]);

        return [];
    }
    get firstError(): string {
        if (this.isInvalid)
            return this.errors[0];

        return '';
    }
    get hasIcon(): boolean {
        return this.icon != undefined && this.icon != null && this.icon.length > 0;
    }
    get required(): boolean {
        console.log(this.control.validator);
        return true;
    }

    constructor() { }
}