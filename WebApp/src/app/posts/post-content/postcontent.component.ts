import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { PostContent } from '../post-content/postcontent.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'post-content',
    templateUrl: 'postcontent.component.html'
})
export class PostContentComponent {
    @Input() post: PostContent;

    constructor() {
    }
}