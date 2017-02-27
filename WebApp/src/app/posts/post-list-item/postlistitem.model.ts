
import { UUID } from 'angular2-uuid';

export interface PostListItem {
    id: UUID;
    title: string;
    date: Date;
    author: {
        avatarUrl: string;
        name: string;
    }
    tags: Array<string>;
    imageUrl: string;
}