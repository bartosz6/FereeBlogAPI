import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { LoginPanel } from './loginpanel.model';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'login-panel',
    templateUrl: 'loginpanel.component.html'
})
export class LoginPanelComponent{
    public loginForm = this._fromBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
    });

    @Output() loginEvent = new EventEmitter();

    loginUser(e) {
        let data = this.loginForm.value;
        this.loginEvent.emit({ login: data.login, password: data.password });;
    }

    constructor(private _fromBuilder: FormBuilder) { }
}