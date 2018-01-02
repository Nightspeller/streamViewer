import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { StreamsActions } from './streams.actions';

import { YoutubeService } from '../services/youtube.service'
import { TwitchService } from '../services/twitch.service'
import { PickerDisplayGroup, PickerGroupItem } from '../declarations/declarations';

@Injectable()
export class PickerActions {
    static PICK_NEW_STREAM = 'PICK_NEW_STREAM';
    static PUSH_NEW_STATE = 'PUSH_NEW_STATE';
    static GO_BACK = 'GO_BACK';
    static CLOSE_PICKER = 'CLOSE_PICKER';
    static ADD_TWITCH_USERNAME = 'ADD_TWITCH_USERNAME';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private twitchService: TwitchService,
        private youtubeService: YoutubeService,
        private streamsActions: StreamsActions
    ) {}

    pickNewStream(streamId: number): void {
        this.generatePickerData('initial', '').then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                pickerForStream: streamId,
                pickerData: pickerData,
                twitchUserName: localStorage.getItem('twitchUserName')
            } })
        });
    }

    pickerGroupClicked(pickedGroup: PickerDisplayGroup): void {
        this.generatePickerData(pickedGroup.headerLeadsTo).then(pickerData => {
            this.ngRedux.dispatch({ type: PickerActions.PUSH_NEW_STATE, payload: pickerData })
        });
    }

    pickerItemClicked(pickedGroup: PickerDisplayGroup, pickerItem: PickerGroupItem): void {
        console.log(pickedGroup, pickerItem);
        switch (pickedGroup.itemLeadsTo) {
            case 'picking-done':
                this.streamsActions.addNewStream(this.ngRedux.getState().picker.pickerForStream, pickerItem);
                this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
                break;
            case 'user-settings':
                let twitchUserName = window.prompt('Enter twitch user name');
                if (twitchUserName) {
                    localStorage.setItem('twitchUserName', twitchUserName);
                } else {
                    localStorage.setItem('twitchUserName', '');
                }
                // TODO: payload still incorrect! fix it
                this.ngRedux.dispatch({ type: PickerActions.ADD_TWITCH_USERNAME, payload: twitchUserName });
                this.pickNewStream(this.ngRedux.getState().picker.pickerForStream);
                break;
            default:
                this.generatePickerData(pickedGroup.itemLeadsTo, pickerItem.code).then(pickerData => {
                    this.ngRedux.dispatch({ type: PickerActions.PUSH_NEW_STATE, payload: pickerData })
                });
                break;
        }
    }

    goBack(): void {
        this.ngRedux.dispatch({ type: PickerActions.GO_BACK });
    }

    pickerSearch(query: string): void {
        if (query.length ===  0) {
            this.goBack();
        } else {
            if (query.length >= 3) {
                this.generatePickerData('search', query).then(pickerData => {
                    this.ngRedux.dispatch({ type: PickerActions.PUSH_NEW_STATE, payload:  pickerData })
                });
            }
        }
    }

    closePicker(): void {
        this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
    }

    generatePickerData(stateName: string, stateParams?: string): Promise<PickerDisplayGroup[]> {
        return new Promise((resolve, reject) => {
            switch (stateName) {
                case 'initial':
                    let twitchGames = this.twitchService.getGames(5, 0);
                    let twitchFeaturedStreams = this.twitchService.getFeaturedStreams(3, 0);
                    let youtubeFeaturedVideos = this.youtubeService.getFeaturedVideos(3, 0);
                    let userFollows = this.twitchService.getUserFollows(3, 0, localStorage.getItem('twitchUserName'));

                    Promise.all([twitchGames, twitchFeaturedStreams, userFollows, youtubeFeaturedVideos]).then(pickerData => {
                        resolve (pickerData);
                    });
                    break;
                case 'tw-games':
                    this.twitchService.getGames(25, 0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'tw-streams-search':
                    this.twitchService.getStreamsForGame(25, 0, stateParams).then(pickerGroup => {
                        resolve ([pickerGroup])
                    });
                    break;
                case 'tw-user-follows':
                    this.twitchService.getUserFollows(25, 0, localStorage.getItem('twitchUserName')).then(pickerGroup => {
                        resolve ([pickerGroup])
                    });
                    break;
                case 'tw-streams':
                    this.twitchService.getFeaturedStreams(25, 0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'youtube':
                    this.youtubeService.getFeaturedVideos(25, 0).then(pickerGroup => {
                        resolve ([pickerGroup]);
                    });
                    break;
                case 'search':
                    // if (this.ngRedux.getState().picker.pickerCurrentState !== 'youtube') {
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
