import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, QueryEncoder, Headers } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { QueryHelper } from '../../common/helpers/query.helper';
import { AppConsts } from '../../app.consts';
import * as postListActions from '../post-list/postlist.actions';

@Injectable()
export class PostsEffects {
    constructor(
        private http: Http,
        private actions$: Actions,
        private queryHelper: QueryHelper,
        private consts: AppConsts
    ) { }

    @Effect() loadPosts$ = this.actions$.ofType(postListActions.ActionTypes.LOAD_MORE_POSTS)
        .map(action => action.payload)
        .switchMap(payload => {
            let params: URLSearchParams = new URLSearchParams();
            params.set('tag', payload.tag);
            params.set('startIndex', payload.startIndex.toString());
            params.set('length', payload.length.toString());

            return this.http.get("http://localhost:5000/api/blog/query", {
                search: params
            });
        })
        .map(result => new postListActions.LoadMorePostsOk({
            posts: result.json()
        }))
        .catch(ex => {
            console.warn(ex);

            return Observable.of(new postListActions.LoadMorePostsError({
                message: "Cannot get more posts"
            }))
        })
}