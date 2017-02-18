import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

export const ActionTypes = {
    LOAD_MORE_POSTS: 'LOAD_MORE_POSTS'
}

export interface LoadMorePostsModel {
    startIndex: number;
    length: number; 
}

export class LoadMorePosts implements Action {
    type = ActionTypes.LOAD_MORE_POSTS;
    constructor(public payload: LoadMorePostsModel) {};
}
