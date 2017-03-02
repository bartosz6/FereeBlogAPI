import '@ngrx/core/add/operator/select';
import *  as actions from './postlist.actions'
import { Observable } from 'rxjs';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface PostListState {
    posts: Array<PostListItem>;
}

const initialState : PostListState = {
    posts: []
}

export function postListReducer(state = initialState, action: Action): PostListState {
    switch(action.type) {
        case actions.ActionTypes.LOAD_MORE_POSTS:
        {
            const payload: actions.LoadMorePostsModel = action.payload;
            return state;
        }
        case actions.ActionTypes.LOAD_MORE_POSTS_OK:
        {
            const payload: actions.LoadMorePostsOkModel = action.payload;
            let s = Object.assign({}, state, {
                posts: [...state.posts, ...payload.posts]
            });
            return s;
        }
        case actions.ActionTypes.LOAD_MORE_POSTS_ERROR:
        {
            const payload: actions.LoadMorePostsErrorModel = action.payload;
            console.warn(payload.message);
            return state;
        }
        case actions.ActionTypes.FILTER_LIST:
        {
            const payload: actions.FilterListModel = action.payload;
            return state;
        }
        case actions.ActionTypes.FILTER_LIST_OK:
        {
            const payload: actions.FilterListOkModel = action.payload;

            return Object.assign({}, state, {
                posts: payload.posts
            });
        }
        case actions.ActionTypes.FILTER_LIST_ERROR:
        {
            const payload: actions.FilterListErrorModel = action.payload;
            console.warn(payload.message);
            return state;
        }
        default:
            return state;
    }
}

export function getPosts(state$: Observable<PostListState>) {
    return state$.select(state => state.posts);
}