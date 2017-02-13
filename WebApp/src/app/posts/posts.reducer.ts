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
        content: "Lorem ipsum dolor sit amet.",
        date: new Date(),
        author: "Bartosz Kowalczyk"
    }]
}

export function reducer(state = initialState, action: Action): State {
    switch(action.type) {
        case posts.ActionTypes.ADD_POST:
        {
            const payload: posts.AddPostActionModel = action.payload;
            const post: Post = { 
                date: new Date(), 
                id: UUID.UUID(),
                content: payload.content,
                author: payload.author
            };
            return {
                posts: [...state.posts, post]
            }
        }
        case posts.ActionTypes.EDIT_POST:
        {
            const payload: posts.EditPostActionModel = action.payload;
            const post : Post = Object.assign({}, payload, { date: new Date() })
            return {
                posts: [...(state.posts.filter(post => post.id === payload.id)), post]
            }
        }
        case posts.ActionTypes.DELETE_POST:
        {
            const payload: posts.DeletePostActionModel = action.payload;
            return {
                posts: state.posts.filter(post => post.id !== payload.id)
            }
        }
        default:
            return state;
    }
}

export function getPosts(state$: Observable<State>) {
    return state$.select(state => state.posts);
}