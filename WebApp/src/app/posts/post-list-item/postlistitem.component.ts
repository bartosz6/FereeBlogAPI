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

    details() {
        this.detailsEvent.emit(this.post.id);
    }

    constructor() { }
}