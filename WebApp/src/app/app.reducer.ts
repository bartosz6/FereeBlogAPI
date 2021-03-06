import { PostListState } from './components/containers/posts/post-list/postlist.reducer';
import { PostDetailsState } from './components/containers/posts/post-details/postdetails.reducer';
import { RouterState } from '@ngrx/router-store';

export interface AppState {
    postList: PostListState,
    postDetails: PostDetailsState,
    router: RouterState
}