import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import {PostListItem} from './postlistitem.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-list-item',
    templateUrl: 'postlistitem.component.html'
})
export class PostListItemComponent {
    @Input() post: PostListItem;
    @Output() detailsEvent = new EventEmitter();

    get showAvatar() : boolean {
        let result = !!this.post && !!this.post.author && !!this.post.author.avatarUrl;
        return result;
    }

    details() {
        this.detailsEvent.emit(this.post.id);
    }

    constructor() { }
}