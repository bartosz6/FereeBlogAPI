import {combineReducers, ActionReducer} from '@ngrx/store';
import {Observable} from "rxjs";
import {compose} from "@ngrx/core";

import * as postsReducer from './posts/posts.reducer';

export interface State {
    postsState: postsReducer.State;
}

const reducers = {
    posts: postsReducer.reducer
}

const combinedReducers: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combinedReducers(state, action);
}

export function getPostsState(state$: Observable<State>)  {
    console.log(state$.select(state => state.postsState));
    return state$.select(state => state.postsState);
}
export const getPosts = compose(postsReducer.getPosts, getPostsState);