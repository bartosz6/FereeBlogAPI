import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { State, Store } from "@ngrx/store";
import { AppState } from '../../../../app.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import * as postListReducer from './postlist.reducer';
import * as postListActions from './postlist.actions';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list',
    templateUrl: 'postlist.component.html'
})
export class PostListComponent {
    posts: Observable<PostListItem[]>
    
    navigateToPostDetails(postId: UUID) {
        console.info(`Navigation to post ${postId} details.`);
        this._store.dispatch(go(['/post'], { id: postId }));
    }

    more() {
        this._store.dispatch(new postListActions.LoadMorePosts({
            length: 5,
            startIndex: 15,
            tag: ""
        }));
    }

    constructor(private _store: Store<AppState>) { 
        this.posts = _store.select(a => a.postList).let(postListReducer.getPosts);
    }
}