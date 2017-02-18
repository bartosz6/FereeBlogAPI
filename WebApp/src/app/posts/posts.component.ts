import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import {Post} from './post.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'posts-list',
    templateUrl: 'posts.component.html'
})
export class PostsComponent{
    @Input() posts: Post[];
    
    @Output() deleteEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();

    delete(id) {
        this.deleteEvent.emit({id});
    }
    edit(newAuthor, newContent) {
        this.deleteEvent.emit({ content: newContent, author: newAuthor });
    }

    constructor() { }
}