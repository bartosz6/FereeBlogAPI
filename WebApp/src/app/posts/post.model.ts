
import { UUID } from 'angular2-uuid';

export interface Post {
    id: UUID;
    brief: string;
    title: string;
    date: Date;
    author: string;
    tags: Array<string>;
    imageUrl: string;
}