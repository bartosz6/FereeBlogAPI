import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

export const ActionTypes = {
    ADD_POST: 'ADD_POST',
    DELETE_POST: 'DELETE_POST',
    EDIT_POST: 'EDIT_POST'
}

export interface AddPostActionModel {
    author: string;
    content: string;
} export interface EditPostActionModel {
    id: UUID;
    author: string;
    content: string;
} export interface DeletePostActionModel {
    id: UUID;
}

export class AddPostAction implements Action {
    type = ActionTypes.ADD_POST;
    constructor(public payload: AddPostActionModel) {};
}
export class DeletePostAction implements Action {
    type = ActionTypes.DELETE_POST;
    constructor(public payload: DeletePostActionModel) {};
}
export class EditPostAction implements Action {
    type = ActionTypes.EDIT_POST;
    constructor(public payload: EditPostActionModel) {};
}

export type Actions = AddPostAction | EditPostAction | DeletePostAction;