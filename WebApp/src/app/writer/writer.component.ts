import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Post } from '../posts/post.model';

@Component({
    selector: 'writer',
    templateUrl: 'writer.component.html'
})
export class WriterComponent{
    @Output() createPost = new EventEmitter();

    createPostAction(content, author) {

      let post = {
        author : author.value,
        content : content.value
      }

      this.createPost.emit(post);
      content.value = '';
      author.value = '';
    }

    constructor() { }
}