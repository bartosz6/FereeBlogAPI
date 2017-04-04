import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as loginActions from '../login/login.actions';
import { IAuthService } from '../../../../infrastructure/services/IAuthService';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: IAuthService
    ) { }

    @Effect() userLogin$ = this.actions$.ofType(loginActions.ActionTypes.USER_LOG_IN)
        .map(action => action.payload)
        .switchMap(payload => this.authService.login(payload))
        .map(result => new loginActions.UserLoginOk({
            token: result
        }))
        .catch(ex => {
            return Observable.of(new loginActions.UserLoginError({
                errors: ex
            }))
        });
}