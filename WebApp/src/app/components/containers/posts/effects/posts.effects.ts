import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as postListActions from '../post-list/postlist.actions';
import { IPostsService } from '../../../../infrastructure/services/IPostsService';

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private postsService: IPostsService
    ) { }

    @Effect() loadPosts$ = this.actions$.ofType(postListActions.ActionTypes.LOAD_MORE_POSTS)
        .map(action => action.payload)
        .switchMap(payload => this.postsService.getPosts(payload))
        .map(result => new postListActions.LoadMorePostsOk({
            posts: result.posts,
            hasMoreItems: result.hasMoreItems
        }))
        .catch(ex => {
            return Observable.of(new postListActions.LoadMorePostsError({
                message: ex
            }))
        });
}