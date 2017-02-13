
import { UUID } from 'angular2-uuid';

export interface Post {
    id: UUID;
    content: string;
    date: Date;
    author: string;
}