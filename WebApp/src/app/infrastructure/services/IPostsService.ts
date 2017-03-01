import { PostListItem } from '../../components/childs/posts/post-list/post-list-item/postlistitem.model';
import { Observable } from 'rxjs/Observable';

export abstract class IPostsService {
    getPosts(query: any) : Observable<PostListItem[]> { return }
}