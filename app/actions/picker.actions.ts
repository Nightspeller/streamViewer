import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/store';
import { StreamsActions } from '../actions/actions';

import { YoutubeService } from '../services/youtube.service'
import { TwitchService } from '../services/twitch.service'
import {PickerDisplayGroup, PickerGroupItem} from "../declarations/declarations";

@Injectable()
export class PickerActions {
    static PICK_NEW_STREAM = "PICK_NEW_STREAM";
    static CLOSE_PICKER = "CLOSE_PICKER";

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private twitchService: TwitchService,
        private youtubeService: YoutubeService,
        private streamsActions: StreamsActions
    ) {}

    pickNewStream(streamId: number): void {
        this.generatePickerData('initial','').then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                pickerForStream: streamId,
                pickerCurrentState: 'initial',
                pickerPreviousState: '',
                pickerData: pickerData
            } })
        });
    }

    pickerGroupClicked(pickedGroup: PickerDisplayGroup): void {
        this.generatePickerData(pickedGroup.headerLeadsTo).then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                pickerForStream: this.ngRedux.getState().picker.pickerForStream,
                pickerCurrentState: pickedGroup.headerLeadsTo,
                pickerPreviousState: this.ngRedux.getState().picker.pickerCurrentState,
                pickerData: pickerData
            } })
        });
    }

    pickerItemClicked(pickedGroup: PickerDisplayGroup, pickerItem: PickerGroupItem): void {
        console.log(pickedGroup, pickerItem);
        if (pickedGroup.itemLeadsTo === 'picking-done') {
            this.streamsActions.addNewStream(this.ngRedux.getState().picker.pickerForStream, pickerItem);
            this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
        } else {
            this.generatePickerData(pickedGroup.itemLeadsTo, pickerItem.code).then(pickerData => {
                this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                    pickerForStream: this.ngRedux.getState().picker.pickerForStream,
                    pickerCurrentState: pickedGroup.itemLeadsTo,
                    pickerPreviousState: this.ngRedux.getState().picker.pickerCurrentState,
                    pickerData: pickerData
                } })
            });
        }
    }

    goBack(): void {
        this.generatePickerData('initial').then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                pickerForStream: this.ngRedux.getState().picker.pickerForStream,
                pickerCurrentState: 'initial',
                pickerPreviousState: 'initial',
                pickerData: pickerData
            } })
        });
    }

    pickerSearch(query: string): void {
        this.generatePickerData('search', query).then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                pickerForStream: this.ngRedux.getState().picker.pickerForStream,
                pickerCurrentState: this.ngRedux.getState().picker.pickerCurrentState,
                pickerPreviousState: this.ngRedux.getState().picker.pickerCurrentState,
                pickerData: pickerData
            } })
        });
    }

    closePicker(): void {
        this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
    }

    generatePickerData(stateName: string, stateParams? :string): Promise<PickerDisplayGroup[]> {
        return new Promise((resolve, reject) => {
            switch (stateName) {
                case 'initial':
                    let twitchGames = this.twitchService.getGames(5,0);
                    let twitchFeaturedStreams = this.twitchService.getFeaturedStreams(3,0);
                    let youtubeFeaturedVideos = this.youtubeService.getFeaturedVideos(3,0);

                    Promise.all([twitchGames, twitchFeaturedStreams, youtubeFeaturedVideos]).then(pickerData => {
                        resolve (pickerData);
                    });
                    break;
                case 'tw-games':
                    this.twitchService.getGames(25,0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'tw-streams-search':
                    this.twitchService.getStreamsForGame(25,0, stateParams).then(pickerGroup => {
                        resolve ([pickerGroup])
                    });
                    break;
                case 'tw-streams':
                    this.twitchService.getFeaturedStreams(25,0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'youtube':
                    this.youtubeService.getFeaturedVideos(25,0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'search':
                    //if (this.ngRedux.getState().picker.pickerCurrentState !== 'youtube') {
                        let searchGames = this.twitchService.searchForGame(stateParams, 5, 0);
                        let searchStreamer = this.twitchService.searchForStreamer(stateParams, 5, 0);

                        Promise.all([searchGames, searchStreamer]).then(pickerData => {
                            resolve (pickerData);
                        });
                    /*} else {
                        this.youtubeService.search(stateParams,5,0).then(pickerGroup => {
                            resolve ([pickerGroup]);
                        });
                    }*/

            }
        });
    }
}