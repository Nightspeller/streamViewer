import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';

@Injectable()
export class LayoutActions {
    static TOGGLE_CHAT = 'TOGGLE_CHAT';
    static TOGGLE_OVERVIEW = 'TOGGLE_OVERVIEW';
    static UPDATE_LAYOUT = 'UPDATE_LAYOUT';

    constructor(private ngRedux: NgRedux<IAppState>) {}

    toggleChat() {
        this.ngRedux.dispatch({ type: LayoutActions.TOGGLE_CHAT });
    }

    toggleOverview() {
        this.ngRedux.dispatch({ type: LayoutActions.TOGGLE_OVERVIEW });
    }

    layoutChanged(element: HTMLElement) {
        this.ngRedux.dispatch({ type: LayoutActions.UPDATE_LAYOUT, payload: element});
    }
}
