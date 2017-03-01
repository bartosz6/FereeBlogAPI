import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { PostListItem } from '../post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list',
    templateUrl: 'postlist.component.html'
})
export class PostListComponent implements OnInit {
    @Input() posts: PostListItem[];
    
    @Output() navigateToPostDetailsEvent = new EventEmitter();
    @Output() loadMorePostsEvent = new EventEmitter();

    loadMorePosts(){
        this.loadMorePostsEvent.emit();
    }

    navigateToPostDetails(data) {
        this.navigateToPostDetailsEvent.emit(data);
    }

    ngOnInit() {
        if(!!this.posts && this.posts.length === 0)
            this.loadMorePostsEvent.emit();
    }

    constructor() { 
    }
}