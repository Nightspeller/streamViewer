import { Component, Input, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { StreamState} from '../../declarations/declarations'

import { StreamsActions, PickerActions } from '../../actions/actions';
import { IAppState } from "../../store/store";

@Component({
    selector: 'sv-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.styl']
})
export class OverviewComponent implements OnInit{

    @Input() previewContainerId: number;

    private streamState: StreamState;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private streamsActions: StreamsActions,
        private pickerActions: PickerActions
    ) { }

    ngOnInit(): void {

        let stream: Observable<StreamState> = this.ngRedux.select(state => state.streams[this.previewContainerId]);

        stream.subscribe((streamState: StreamState) => {
            this.streamState = streamState;
        });
    }

    addNewStream(): void {
        console.log('adding');
        this.pickerActions.pickNewStream(this.previewContainerId)
    }

    refreshStream(): void {
        console.log('refreshing');
        this.streamsActions.refreshStream(this.previewContainerId)
    }

    deleteStream(): void {
        console.log('deleting');
        this.streamsActions.deleteStream(this.previewContainerId)
    }

    moveStreamToPreview(): void {
        console.log('moving to prev');
        if (this.streamState.position !== 'OMNI') {
            if (this.streamState.position !== 'PREVIEW') {
                this.streamsActions.moveToPreview(this.previewContainerId)
            } else {
                this.streamsActions.moveToOverview(this.previewContainerId);
            }
        }
    }

    showFastPreview(): void {
        if (this.streamState.position === 'OVERVIEW') {
            this.streamsActions.moveToQuickPreview(this.previewContainerId)
        }
    }

    hideFastPreview(): void {
        if (this.streamState.position === 'QUICK_PREVIEW') {
            this.streamsActions.moveToOverview(this.previewContainerId)
        }
    }

    moveStreamToMain(): void {
        console.log('moving to main');
        if (this.streamState.position !== 'OMNI') {
            if (this.streamState.position !== 'MAIN') {
                this.streamsActions.moveToMain(this.previewContainerId)
            } else {
                this.streamsActions.moveToOverview(this.previewContainerId);
            }

        }
    }
}
