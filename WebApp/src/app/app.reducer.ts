import { PostListState } from './posts/post-list/postlist.reducer';
import { RouterState } from '@ngrx/router-store';

export interface AppState {
    postList: PostListState,
    router: RouterState
}