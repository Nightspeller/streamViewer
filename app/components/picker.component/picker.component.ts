import { Component, OnInit } from '@angular/core';

import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import {PickerDisplayGroup, PickerGroupItem} from '../../declarations/declarations'

import { PickerActions } from '../../actions/actions';

import { IAppState, IPicker, IStreams } from '../../store/store'

@Component({
    moduleId: module.id,
    selector: 'sv-picker',
    templateUrl: 'picker.component.html',
    styleUrls: ['picker.component.css']
})
export class PickerComponent implements OnInit {

    @select() streams: Observable<IStreams>;
    @select() picker: Observable<IPicker>;

    private currentState: string;
    private currentData: PickerDisplayGroup[];
    private pickerShown: boolean;
    private searchQuery: string = '';


    constructor (
        private ngRedux: NgRedux<IAppState>,
        private pickerActions: PickerActions
    ) { }


    ngOnInit(): void {

        this.currentData = this.ngRedux.getState().picker.pickerData;

        this.picker.subscribe((picker: IPicker) => {
            this.pickerShown = picker.pickerShown;
            this.currentState = picker.pickerCurrentState;
            this.currentData = picker.pickerData;
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

    closePicker(): void {
        this.pickerActions.closePicker();
    }
}