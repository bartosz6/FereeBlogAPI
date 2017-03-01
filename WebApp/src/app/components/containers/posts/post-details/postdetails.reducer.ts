import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs';
import { PostContent } from '../../../childs/posts/post-details/post-content/postcontent.model';
import { UUID } from 'angular2-uuid';
import { Action } from '@ngrx/store';

export interface PostDetailsState {
    post: PostContent
}

const initialState : PostDetailsState = {
    post: {
        author: { name: 'loading...', avatarUrl: null},
        content: 'loading...',
        date: null,
        id: null,
        imageUrl: null,
        tags: null
    }
}

export function postDetailsReducer(state = initialState, action: Action): PostDetailsState {
    switch(action.type) {
        default:
            return state;
    }
}

export function getPost(state$: Observable<PostDetailsState>) {
    return state$.select(state => state.post);
}