import { Http, Response, Request } from '@angular/http';
import { PostListItem } from '../../components/childs/posts/post-list/post-list-item/postlistitem.model';
import { IPostsService } from './IPostsService';
import { URLSearchParams, QueryEncoder, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppConsts } from '../../app.consts';
import { UUID } from 'angular2-uuid';

@Injectable()
export class DummyPostsService implements IPostsService {
    constructor(
    ) { }

    getPosts(query: any): Observable<PostListItem[]> {
        let posts = [
            {
                id: new UUID(),
                title: 'post 1',
                date: new Date(),
                author: {
                    avatarUrl: 'https://pbs.twimg.com/profile_images/609305830534590464/LqHVEN6X.jpg',
                    name: 'test user 1',
                },
                tags: ['tag1', 'tag2'],
                brief: 'lorem ipsum dolor sit amet',
                subposts: [
                    {
                        id: new UUID(),
                        title: 'sub post 1',
                        date: new Date(),
                        author: {
                            avatarUrl: 'https://pbs.twimg.com/profile_images/609305830534590464/LqHVEN6X.jpg',
                            name: 'test user 2',
                        },
                        tags: ['tag3'],
                        brief: 'lorem ipsum dolor sit amet',
                        subposts: [
                        ]
                    },
                    {
                        id: new UUID(),
                        title: 'sub post 2',
                        date: new Date(),
                        author: {
                            avatarUrl: 'https://pbs.twimg.com/profile_images/609305830534590464/LqHVEN6X.jpg',
                            name: 'test user 3',
                        },
                        tags: [],
                        brief: 'lorem ipsum dolor sit amet',
                        subposts: [
                        ]
                    }
                ]
            },
            {
                id: new UUID(),
                title: 'post 2',
                date: new Date(),
                author: {
                    avatarUrl: 'https://pbs.twimg.com/profile_images/609305830534590464/LqHVEN6X.jpg',
                    name: 'test user 5',
                },
                tags: [],
                brief: 'lorem ipsum dolor sit amet',
                subposts: [
                ]
            }
        ];
        return Observable.of(posts);
    }
}

