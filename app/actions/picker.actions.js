"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_redux_1 = require('ng2-redux');
var actions_1 = require('../actions/actions');
var youtube_service_1 = require('../services/youtube.service');
var twitch_service_1 = require('../services/twitch.service');
var PickerActions = (function () {
    function PickerActions(ngRedux, twitchService, youtubeService, streamsActions) {
        this.ngRedux = ngRedux;
        this.twitchService = twitchService;
        this.youtubeService = youtubeService;
        this.streamsActions = streamsActions;
    }
    PickerActions.prototype.pickNewStream = function (streamId) {
        var _this = this;
        this.generatePickerData('initial', '').then(function (pickerData) {
            _this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                    pickerForStream: streamId,
                    pickerCurrentState: 'initial',
                    pickerPreviousState: '',
                    pickerData: pickerData
                } });
        });
    };
    PickerActions.prototype.pickerGroupClicked = function (pickedGroup) {
        var _this = this;
        this.generatePickerData(pickedGroup.headerLeadsTo).then(function (pickerData) {
            _this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                    pickerForStream: _this.ngRedux.getState().picker.pickerForStream,
                    pickerCurrentState: pickedGroup.headerLeadsTo,
                    pickerPreviousState: _this.ngRedux.getState().picker.pickerCurrentState,
                    pickerData: pickerData
                } });
        });
    };
    PickerActions.prototype.pickerItemClicked = function (pickedGroup, pickerItem) {
        var _this = this;
        console.log(pickedGroup, pickerItem);
        if (pickedGroup.itemLeadsTo === 'picking-done') {
            this.streamsActions.addNewStream(this.ngRedux.getState().picker.pickerForStream, pickerItem);
            this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
        }
        else {
            this.generatePickerData(pickedGroup.itemLeadsTo, pickerItem.code).then(function (pickerData) {
                _this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                        pickerForStream: _this.ngRedux.getState().picker.pickerForStream,
                        pickerCurrentState: pickedGroup.itemLeadsTo,
                        pickerPreviousState: _this.ngRedux.getState().picker.pickerCurrentState,
                        pickerData: pickerData
                    } });
            });
        }
    };
    PickerActions.prototype.goBack = function () {
        var _this = this;
        this.generatePickerData('initial').then(function (pickerData) {
            _this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                    pickerForStream: _this.ngRedux.getState().picker.pickerForStream,
                    pickerCurrentState: 'initial',
                    pickerPreviousState: 'initial',
                    pickerData: pickerData
                } });
        });
    };
    PickerActions.prototype.pickerSearch = function (query) {
        var _this = this;
        this.generatePickerData('search', query).then(function (pickerData) {
            _this.ngRedux.dispatch({ type: PickerActions.PICK_NEW_STREAM, payload: {
                    pickerForStream: _this.ngRedux.getState().picker.pickerForStream,
                    pickerCurrentState: _this.ngRedux.getState().picker.pickerCurrentState,
                    pickerPreviousState: _this.ngRedux.getState().picker.pickerCurrentState,
                    pickerData: pickerData
                } });
        });
    };
    PickerActions.prototype.closePicker = function () {
        this.ngRedux.dispatch({ type: PickerActions.CLOSE_PICKER });
    };
    PickerActions.prototype.generatePickerData = function (stateName, stateParams) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            switch (stateName) {
                case 'initial':
                    var twitchGames = _this.twitchService.getGames(5, 0);
                    var twitchFeaturedStreams = _this.twitchService.getFeaturedStreams(3, 0);
                    var youtubeFeaturedVideos = _this.youtubeService.getFeaturedVideos(3, 0);
                    Promise.all([twitchGames, twitchFeaturedStreams, youtubeFeaturedVideos]).then(function (pickerData) {
                        resolve(pickerData);
                    });
                    break;
                case 'tw-games':
                    _this.twitchService.getGames(25, 0).then(function (pickerGroup) {
                        resolve([pickerGroup]);
                    });
                    break;
                case 'tw-streams-search':
                    _this.twitchService.getStreamsForGame(25, 0, stateParams).then(function (pickerGroup) {
                        resolve([pickerGroup]);
                    });
                    break;
                case 'tw-streams':
                    _this.twitchService.getFeaturedStreams(25, 0).then(function (pickerGroup) {
                        resolve([pickerGroup]);
                    });
                    break;
                case 'youtube':
                    _this.youtubeService.getFeaturedVideos(25, 0).then(function (pickerGroup) {
                        resolve([pickerGroup]);
                    });
                    break;
                case 'search':
                    //if (this.ngRedux.getState().picker.pickerCurrentState !== 'youtube') {
                    var searchGames = _this.twitchService.searchForGame(stateParams, 5, 0);
                    var searchStreamer = _this.twitchService.searchForStreamer(stateParams, 5, 0);
                    Promise.all([searchGames, searchStreamer]).then(function (pickerData) {
                        resolve(pickerData);
                    });
            }
        });
    };
    PickerActions.PICK_NEW_STREAM = "PICK_NEW_STREAM";
    PickerActions.CLOSE_PICKER = "CLOSE_PICKER";
    PickerActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, twitch_service_1.TwitchService, youtube_service_1.YoutubeService, actions_1.StreamsActions])
    ], PickerActions);
    return PickerActions;
}());
exports.PickerActions = PickerActions;
//# sourceMappingURL=picker.actions.js.map