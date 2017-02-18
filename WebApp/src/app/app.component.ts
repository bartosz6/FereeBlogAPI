import { Component } from '@angular/core';
import { State, Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { Post } from './posts/post.model';
import * as postsActions from './posts/posts.action';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import * as postsReducer from './posts/posts.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public posts: Observable<Post[]>;

  constructor(private _store: Store<postsReducer.State>) {
      this.posts = this._store.let(postsReducer.getPosts);
  }
  
  // addPost(post: postsActions.AddPostActionModel) {
  //   this._store.dispatch(new postsActions.AddPostAction(post));
  // }

  // deletePost(id: postsActions.DeletePostActionModel) {
  //   this._store.dispatch(new postsActions.DeletePostAction(id));
  // }
}
