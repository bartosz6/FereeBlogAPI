import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { PostListItem } from '../post-list-item/postlistitem.model';
import { UUID } from 'angular2-uuid';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list',
    templateUrl: 'postlist.component.html'
})
export class PostListComponent {
    @Input() posts: PostListItem[];
    @Input() currentTag: string;
    @Input() hasMoreItems: boolean;

    @Output() navigateToPostDetailsEvent = new EventEmitter();
    @Output() loadMorePostsEvent = new EventEmitter();
    @Output() navigateToTagEvent = new EventEmitter();

    loadMorePosts() {
        if (this.hasMoreItems)
            this.loadMorePostsEvent.emit({
                tag: this.currentTag,
                startIndex: this.posts.length
            });
    }

    navigateToPostDetails(data) {
        this.navigateToPostDetailsEvent.emit(data);
    }

    navigateToTag(tag) {
        this.navigateToTagEvent.emit(tag);
    }

    constructor() {
    }
}