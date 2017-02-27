import { PostListItem } from '../../posts/post-list-item/postlistitem.model';
import { Observable } from 'rxjs/Observable';

export abstract class IPostsService {
    getPosts(query: any) : Observable<PostListItem[]> { return }
}