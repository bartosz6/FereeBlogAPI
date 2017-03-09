import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { PostListItem } from '../../../childs/posts/post-list/post-list-item/postlistitem.model';

export const ActionTypes = {
    LOAD_MORE_POSTS: 'LOAD_MORE_POSTS',
    LOAD_MORE_POSTS_OK: 'LOAD_MORE_POSTS_OK',
    LOAD_MORE_POSTS_ERROR: 'LOAD_MORE_POSTS_ERROR',

    FILTER_LIST: 'FILTER_LIST',
    FILTER_LIST_OK: 'FILTER_LIST_OK',
    FILTER_LIST_ERROR: 'FILTER_LIST_ERROR',

    SWITCH_TAG: 'SWITCH_TAG'
}

export interface LoadMorePostsModel {
    startIndex: number;
    length: number; 
    tag: string;
}

export interface LoadMorePostsOkModel {
    hasMoreItems: boolean;
    posts: Array<PostListItem>;
}

export interface LoadMorePostsErrorModel {
    message: any;
}

export interface FilterListModel {
    startIndex: number;
    length: number; 
    tag: string;
}

export interface FilterListOkModel {
    posts: Array<PostListItem>
}

export interface FilterListErrorModel {
    message: any;
}

export interface SwitchTagModel {
    tag: string;
}

export class LoadMorePosts implements Action {
    type = ActionTypes.LOAD_MORE_POSTS;
    constructor(public payload: LoadMorePostsModel) {};
}

export class LoadMorePostsOk implements Action {
    type = ActionTypes.LOAD_MORE_POSTS_OK;
    constructor(public payload: LoadMorePostsOkModel) {};
}
export class LoadMorePostsError implements Action {
    type = ActionTypes.LOAD_MORE_POSTS_ERROR;
    constructor(public payload: LoadMorePostsErrorModel) {};
}

export class FilterList implements Action {
    type = ActionTypes.FILTER_LIST;
    constructor(public payload: FilterListModel) {};
}

export class FilterListOk implements Action {
    type = ActionTypes.FILTER_LIST_OK;
    constructor(public payload: FilterListOkModel) {};
}

export class FilterListError implements Action {
    type = ActionTypes.FILTER_LIST_ERROR;
    constructor(public payload: FilterListOkModel) {};
}

export class SwitchTag implements Action {
    type = ActionTypes.SWITCH_TAG;
    constructor(public payload: SwitchTagModel) {};
}

