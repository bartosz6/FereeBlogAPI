import { Http, Response, Request } from '@angular/http';
import { PostListItem } from '../../components/childs/posts/post-list/post-list-item/postlistitem.model';
import { IPostsService } from './IPostsService';
import { URLSearchParams, QueryEncoder, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppConsts } from '../../app.consts';

@Injectable()
export class PostsService implements IPostsService {
    constructor(
        private http: Http,
        private appConsts: AppConsts
    ) { }

    getPosts(query: any): Observable<PostListItem[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('tag', query.tag);
        params.set('startIndex', query.startIndex.toString());
        params.set('length', query.length.toString());

        let result = this.http.get(this.appConsts.API_URL + "blog/query", {
            search: params
        });

        return result.map(response => response.json());
    }
}

