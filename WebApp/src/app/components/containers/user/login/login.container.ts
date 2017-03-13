import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { State, Store } from "@ngrx/store";
import { AppState } from '../../../../app.reducer';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/combineLatest';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import * as loginActions from './login.actions';

@Component({
    //  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'login-container',
    templateUrl: 'login.container.html'
})
export class LoginContainer {

    login(loginData: any) {
        this._store.dispatch(new loginActions.UserLogin({
            login: loginData.login,
            password: loginData.password,
            returnUrl: this.returnUrl
        }));
    }

    returnUrl: string;
    constructor(
        private _store: Store<AppState>, 
        private _route: ActivatedRoute) {
            // this._route.queryParams.subscribe(params => {
            //     this.returnUrl = params['returnUrl'];
            // });
    }
}