import { Component, OnInit } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import {PickerDisplayGroup, PickerGroupItem} from '../../declarations/declarations'

import { PickerActions } from '../../actions/actions';

import { IAppState, IPicker, IStreams } from '../../store/store'

@Component({
    selector: 'sv-picker',
    templateUrl: 'picker.component.html',
    styleUrls: ['picker.component.styl']
})
export class PickerComponent implements OnInit {

    @select() streams: Observable<IStreams>;
    @select() picker: Observable<IPicker>;

    private currentData: PickerDisplayGroup[];
    private pickerShown: boolean;
    private searchQuery: string = '';
    private backAvailable = false;


    constructor (
        private ngRedux: NgRedux<IAppState>,
        private pickerActions: PickerActions
    ) { }


    ngOnInit(): void {

        this.currentData = this.ngRedux.getState().picker.pickerStatesStack[this.ngRedux.getState().picker.pickerStatesStack.length - 1];

        this.picker.subscribe((picker: IPicker) => {
            this.pickerShown = picker.pickerShown;
            this.currentData = picker.pickerStatesStack[picker.pickerStatesStack.length - 1];
            this.backAvailable = picker.pickerStatesStack.length > 1;
        });
    }

    groupHeaderClicked(group: PickerDisplayGroup): void {
        this.pickerActions.pickerGroupClicked(group);
    }

    groupItemClicked(group: PickerDisplayGroup, item: PickerGroupItem): void {
        this.pickerActions.pickerItemClicked(group, item);
    }

    back(): void {
        this.pickerActions.goBack();
    }

    searchChanged(searchQuery: string): void {
        this.pickerActions.pickerSearch(searchQuery);
    }

    showSettings(): void {
        let twitchUserName = window.prompt('Enter twitch user name');
        if (twitchUserName) {
            localStorage.setItem("twitchUserName", twitchUserName);
        } else {
            localStorage.setItem("twitchUserName", '');
        }

    }

    closePicker(): void {
        this.pickerActions.closePicker();
    }
}
