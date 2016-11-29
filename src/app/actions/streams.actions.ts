import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/store';
import { StreamState, PickerGroupItem } from "../declarations/declarations";

@Injectable()
export class StreamsActions {
    static ADD_NEW_STREAM = "ADD_NEW_STREAM";
    static DELETE_STREAM = "DELETE_STREAM";
    static MOVE_TO_MAIN = "MOVE_TO_MAIN";
    static MOVE_TO_OVERVIEW = "MOVE_TO_OVERVIEW";
    static MOVE_TO_PREVIEW = "MOVE_TO_PREVIEW";
    static MOVE_TO_QUICK_PREVIEW = "MOVE_TO_QUICK_PREVIEW";
    static SWAP_MAIN_AND_PREVIEW = "SWAP_MAIN_AND_PREVIEW";
    static MOVE_TO_OMNI = "MOVE_TO_OMNI";
    static EXIT_OMNI = "EXIT_OMNI";

    constructor(private ngRedux: NgRedux<IAppState>) {}

    addNewStream(streamId: number, item: PickerGroupItem) {
        let stream: StreamState = {
            id: streamId,
            position: '',
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            playerHtml: item.playerHtml,
            chatHtml: item.chatHtml
        };
        this.ngRedux.dispatch({ type: StreamsActions.ADD_NEW_STREAM, payload: stream });
    }

    deleteStream(streamId: number) {
        this.ngRedux.dispatch({ type: StreamsActions.DELETE_STREAM, payload: streamId });
    }

    moveToMain(streamId: number) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_MAIN, payload: streamId });
    }

    moveToOverview(streamId: number) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_OVERVIEW, payload: streamId });
    }

    moveToPreview(streamId: number) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_PREVIEW, payload: streamId });
    }

    moveToQuickPreview(streamId: number) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_QUICK_PREVIEW, payload: streamId });
    }

    refreshStream(streamId: number): void {
        let currentStream = this.ngRedux.getState().streams[streamId];
        this.ngRedux.dispatch({ type: StreamsActions.DELETE_STREAM, payload: streamId });
        this.ngRedux.dispatch({ type: StreamsActions.ADD_NEW_STREAM, payload: currentStream });
    }

    swapMainAndPreview(): void {
        this.ngRedux.dispatch({ type: StreamsActions.SWAP_MAIN_AND_PREVIEW });
    }

    moveToOmni() {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_OMNI });
    }

    exitOmni() {
        this.ngRedux.dispatch({ type: StreamsActions.EXIT_OMNI });
    }
}
