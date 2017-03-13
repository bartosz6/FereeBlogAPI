import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { LoginPanel } from '../../../childs/user/login/login-panel/loginpanel.model';

export const ActionTypes = {
    USER_LOG_IN : 'USER_LOG_IN',
    SET_RETURN_URL: 'SET_RETURN_URL'
}

export interface UserLoginModel {
    login: string;
    password: string;
    returnUrl?: string;
}

export interface SetReturnUrlModel {
    returnUrl: string;
}

export class UserLogin implements Action {
    type = ActionTypes.USER_LOG_IN;
    constructor(public payload: UserLoginModel) {};
}

export class SetReturnUrl implements Action {
    type = ActionTypes.SET_RETURN_URL;
    constructor(public payload: SetReturnUrlModel) {};
}