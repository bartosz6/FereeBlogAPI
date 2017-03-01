import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { State, Store } from "@ngrx/store";
import { AppState } from '../../../../app.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { PostContent } from '../../../childs/posts/post-details/post-content/postcontent.model';
 import * as postListReducer from './postdetails.reducer';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-details',
    templateUrl: 'postdetails.component.html'
})
export class PostDetailsComponent {
    post: Observable<PostContent>

    navigateToPostDetails(postId: UUID) {
        console.info(`Navigation to post ${postId} details.`);
        this._store.dispatch(go(['/details', { routeParam: 1 }], { id: postId }));
    }

    constructor(private _store: Store<AppState>) { 
        this.post = _store.select(a => a.postDetails).let(postListReducer.getPost);
    }
}