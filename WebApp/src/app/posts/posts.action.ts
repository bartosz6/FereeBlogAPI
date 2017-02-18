import { Action } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

export const ActionTypes = {
    NAVIGATE_TO_DETAILS: 'NAVIGATE_TO_DETAILS'
}

export interface NagivateToDetailsModel {
    id: UUID;
}

export class NavigateToDetails implements Action {
    type = ActionTypes.NAVIGATE_TO_DETAILS;
    constructor(public payload: NagivateToDetailsModel) {};
}
