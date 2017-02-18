import '@ngrx/core/add/operator/select';
import *  as actions from './postlist.actions'
import { Observable } from 'rxjs';
import { PostListItem } from '../post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface PostListState {
    posts: Array<PostListItem>
}

const initialState : PostListState = {
    posts: [{
        id: UUID.UUID(),
        title: "Tiiiiitle",
        date: new Date(),
        author: { 
            name: "Bartosz Kowalczyk" ,
            avatarUrl: ''
        },
        imageUrl: "http://materializecss.com/images/sample-1.jpg",
        tags: ['test', 'heheszki', 'oopa']
    }]
}

export function postListReducer(state = initialState, action: Action): PostListState {
    switch(action.type) {
        case actions.ActionTypes.LOAD_MORE_POSTS:
        {
            const payload: actions.LoadMorePostsModel = action.payload;
            throw "Trying To Navigate REDUCER";
        }
        default:
            return state;
    }
}

export function getPosts(state$: Observable<PostListState>) {
    return state$.select(state => state.posts);
}