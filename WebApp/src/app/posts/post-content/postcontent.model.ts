import { UUID } from 'angular2-uuid';

export interface PostContent {
    id: UUID,
    author: {
        name: string,
        avatarUrl: string
    },
    content: string,
    tags: Array<string>,
    date: Date,
    imageUrl: string
}