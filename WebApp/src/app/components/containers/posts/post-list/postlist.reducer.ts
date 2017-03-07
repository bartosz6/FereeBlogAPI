import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/count';
import *  as actions from './postlist.actions'
import { Observable } from 'rxjs';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface PostListState {
    posts: Array<PostListItem>;
    currentTag: string;
}

const initialState: PostListState = {
    posts: [],
    currentTag: ''
}

export function postListReducer(state = initialState, action: Action): PostListState {
    switch (action.type) {
        case actions.ActionTypes.SWITCH_TAG:
            {
                const payload: actions.SwitchTagModel = action.payload;
                return Object.assign({}, state, {
                    currentTag: payload.tag,
                    posts: []
                });
            }
        case actions.ActionTypes.LOAD_MORE_POSTS:
            {
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
                return state;
            }
        default:
            return state;
    }
}

export function getPosts(state$: Observable<PostListState>) {
    return state$.select(state => state.posts);
}

export function getCurrentTag(state$: Observable<PostListState>) {
    return state$.select(state => state.currentTag);
}

export function getPostCount(state$: Observable<PostListState>) {
    return state$.select(state => state.posts.length);
}