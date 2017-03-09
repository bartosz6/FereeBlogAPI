
import { UUID } from 'angular2-uuid';

export interface PostListItem {
    id: UUID;
    parentId?: UUID;
    title: string;
    date: Date;
    author: {
        avatarUrl: string;
        name: string;
    }
    tags: Array<string>;
    brief: string;

    subposts: Array<PostListItem>;
}