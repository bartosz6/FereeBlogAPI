import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { LoginPanel } from '../../../childs/user/login/login-panel/loginpanel.model';

export const ActionTypes = {
    USER_LOG_IN : 'USER_LOG_IN'
}

export interface UserLoginModel {
    login: string;
    password: string;
    returnUrl?: string;
}

export class UserLogin implements Action {
    type = ActionTypes.USER_LOG_IN;
    constructor(public payload: UserLoginModel) {};
}