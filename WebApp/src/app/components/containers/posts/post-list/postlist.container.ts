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
import * as postListReducer from './postlist.reducer';
import * as postListActions from './postlist.actions';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Component({
    //  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list-container',
    templateUrl: 'postlist.container.html'
})
export class PostListContainer implements OnInit, OnDestroy {
    posts: Observable<PostListItem[]>;
    tag: Observable<string>;
    hasMoreItems: Observable<boolean>;

    navigateToPostDetails(postId: UUID) {
        console.log(postId.toString());
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


    private tag$ : any;
    private currentTag: string;
    ngOnInit() {
        this.tag$ = this._route.params.subscribe(params => {
            this.switchTag(params['tag']);
        });
    }

    ngOnDestroy() {
        this.tag$.unsubscribe();
    }

    constructor(
        private _store: Store<AppState>, 
        private _route: ActivatedRoute) {
        this.posts = _store.select(a => a.postList).let(postListReducer.getPosts);
        this.hasMoreItems = _store.select(a => a.postList).let(postListReducer.getHasMoreItems);
        this.tag = _store.select(a => a.postList).let(postListReducer.getCurrentTag);
    }
}