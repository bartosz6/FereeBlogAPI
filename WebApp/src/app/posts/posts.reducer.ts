import '@ngrx/core/add/operator/select';
import *  as posts from './posts.action'
import { Observable } from 'rxjs';
import {Post} from './post.model';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface State {
    posts: Array<Post>
}

const initialState : State = {
    posts: [{
        id: UUID.UUID(),
        brief: "Lorem ipsum dolor sit amet...",
        title: "Tiiiiitle",
        date: new Date(),
        author: "Bartosz Kowalczyk",
        imageUrl: "http://materializecss.com/images/sample-1.jpg",
        tags: ['test', 'heheszki', 'oopa']
    }]
}

export function reducer(state = initialState, action: Action): State {
    switch(action.type) {
        case posts.ActionTypes.NAVIGATE_TO_DETAILS:
        {
            const payload: posts.NagivateToDetailsModel = action.payload;
            
            return null;
        }
        default:
            return state;
    }
}

export function getPosts(state$: Observable<State>) {
    return state$.select(state => state.posts);
}