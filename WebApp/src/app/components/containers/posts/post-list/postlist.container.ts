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

    renderedPostsCount: number;
    currentTag: string;

    navigateToPostDetails(postId: UUID) {
        this._store.dispatch(go(['/post'], { id: postId }));
    }

    navigateToTag(tag: string) {
        this._store.dispatch(go([`/blog/${tag}`]));
    }

    loadMorePosts() {
        this._store.dispatch(
            new postListActions.LoadMorePosts({
                startIndex: this.renderedPostsCount,
                tag: this.currentTag,
                length: 1
            })
        );
    }

    //todo: add action switch tag - replace current list
    // switch tag should clear the list and switch tag, then call load more posts
    switchTag() {
        this._store.dispatch(
            new postListActions.SwitchTag({
                tag: this.currentTag
            })
        );
        this._store.dispatch(
            new postListActions.LoadMorePosts({
                startIndex: 0,
                tag: this.currentTag,
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

        _store.select(a=>a.postList).let(postListReducer.getPostCount).subscribe(c => {
            this.renderedPostsCount = c;
            console.log(c);
        });

        this.tag.skip(1).subscribe(t => {
            console.info(`Switching to: ${t}`);
            this.currentTag = t;
            this.switchTag();
        });

        //dorobic getTag do reducera i subscribe
    }
}