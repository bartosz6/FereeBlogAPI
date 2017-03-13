import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { State, Store } from "@ngrx/store";
import { AppState } from '../../app.reducer';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import * as loginActions from '../../components/containers/user/login/login.actions';

@Injectable()
export class AuthGuard implements CanActivate {
    requestedPath: string;

    constructor(
        private _store: Store<AppState>) {
        this.requestedPath = window.location.pathname; //not yet registered in router!
    }

    canActivate() {
        var isLoggedIn = tokenNotExpired();
        if (!isLoggedIn) {
            this._store.dispatch(go([`/login`]));
            this._store.dispatch(new loginActions.SetReturnUrl({ returnUrl: this.requestedPath }));
        }
        return isLoggedIn;
    }
}