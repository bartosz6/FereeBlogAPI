import { PostListState } from './posts/post-list/postlist.reducer';
import { PostDetailsState } from './posts/post-Details/postDetails.reducer';
import { RouterState } from '@ngrx/router-store';

export interface AppState {
    postList: PostListState,
    postDetails: PostDetailsState,
    router: RouterState
}