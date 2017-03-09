import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { State, Store } from "@ngrx/store";
import { AppState } from '../../../../app.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/combineLatest';
import * as postListReducer from './postlist.reducer';
import * as postListActions from './postlist.actions';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Component({
    //  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list-container',
    templateUrl: 'postlist.container.html'
})
export class PostListContainer {
    posts: Observable<PostListItem[]>;
    tag: Observable<string>;
    hasMoreItems: Observable<boolean>;

    navigateToPostDetails(postId: UUID) {
        this._store.dispatch(go(['/post'], { id: postId }));
    }

    navigateToTag(tag: string) {
        this._store.dispatch(go([`/blog/${tag}`]));
    }

    loadMorePosts(request) {
        this._store.dispatch(
            new postListActions.LoadMorePosts({
                startIndex: request.startIndex,
                tag: request.tag,
                length: 1
            })
        );
    }

    //todo: add action switch tag - replace current list
    // switch tag should clear the list and switch tag, then call load more posts
    switchTag(tag) {
        this._store.dispatch(
            new postListActions.SwitchTag({
                tag
            })
        );
        this._store.dispatch(
            new postListActions.LoadMorePosts({
                startIndex: 0,
                tag,
                length: 1
            })
        );
    }

    constructor(private _store: Store<AppState>) {
        this.posts = _store.select(a => a.postList).let(postListReducer.getPosts);
        this.tag = _store.select(a => a.router).map(routerState => {
            let pathParts = routerState.path.split('/');
            return pathParts[pathParts.length - 1];
        });

        this.tag.skip(1).subscribe(tag => {
            console.info(`Switching to: ${tag}`);
            this.switchTag(tag);
        });

        this.hasMoreItems = _store.select(a => a.postList).let(postListReducer.getHasMoreItems);
    }
}