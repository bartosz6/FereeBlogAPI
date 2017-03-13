import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/count';
import *  as actions from './login.actions'
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface LoginState {
    login: string;
    returnUrl: string;
    isLoggedIn: boolean;
}

const initialState: LoginState = {
    login: '',
    returnUrl: null,
    isLoggedIn: false
}

export function loginReducer(state = initialState, action: Action): LoginState {
    switch (action.type) {
        case actions.ActionTypes.USER_LOG_IN:
            {
                const payload: actions.UserLoginModel = action.payload;
                return Object.assign({}, state, {
                    returnUrl: payload.returnUrl,
                    login: payload.login,
                    isLoggedIn: true
                });
            }
        default:
            return state;
    }
}

export function getIsLoggedIn(state$: Observable<LoginState>) {
    return state$.select(state => state.isLoggedIn);
}

export function getUserLogin(state$: Observable<LoginState>) {
    return state$.select(state => state.login);
}
