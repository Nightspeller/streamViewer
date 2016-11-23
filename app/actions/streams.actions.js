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
var StreamsActions = (function () {
    function StreamsActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    StreamsActions.prototype.addNewStream = function (streamId, item) {
        var stream = {
            id: streamId,
            position: '',
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            playerHtml: item.playerHtml,
            chatHtml: item.chatHtml
        };
        this.ngRedux.dispatch({ type: StreamsActions.ADD_NEW_STREAM, payload: stream });
    };
    StreamsActions.prototype.deleteStream = function (streamId) {
        this.ngRedux.dispatch({ type: StreamsActions.DELETE_STREAM, payload: streamId });
    };
    StreamsActions.prototype.moveToMain = function (streamId) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_MAIN, payload: streamId });
    };
    StreamsActions.prototype.moveToOverview = function (streamId) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_OVERVIEW, payload: streamId });
    };
    StreamsActions.prototype.moveToPreview = function (streamId) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_PREVIEW, payload: streamId });
    };
    StreamsActions.prototype.moveToQuickPreview = function (streamId) {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_QUICK_PREVIEW, payload: streamId });
    };
    StreamsActions.prototype.refreshStream = function (streamId) {
        var currentStream = this.ngRedux.getState().streams[streamId];
        this.ngRedux.dispatch({ type: StreamsActions.DELETE_STREAM, payload: streamId });
        this.ngRedux.dispatch({ type: StreamsActions.ADD_NEW_STREAM, payload: currentStream });
    };
    StreamsActions.prototype.swapMainAndPreview = function () {
        this.ngRedux.dispatch({ type: StreamsActions.SWAP_MAIN_AND_PREVIEW });
    };
    StreamsActions.prototype.moveToOmni = function () {
        this.ngRedux.dispatch({ type: StreamsActions.MOVE_TO_OMNI });
    };
    StreamsActions.prototype.exitOmni = function () {
        this.ngRedux.dispatch({ type: StreamsActions.EXIT_OMNI });
    };
    StreamsActions.ADD_NEW_STREAM = "ADD_NEW_STREAM";
    StreamsActions.DELETE_STREAM = "DELETE_STREAM";
    StreamsActions.MOVE_TO_MAIN = "MOVE_TO_MAIN";
    StreamsActions.MOVE_TO_OVERVIEW = "MOVE_TO_OVERVIEW";
    StreamsActions.MOVE_TO_PREVIEW = "MOVE_TO_PREVIEW";
    StreamsActions.MOVE_TO_QUICK_PREVIEW = "MOVE_TO_QUICK_PREVIEW";
    StreamsActions.SWAP_MAIN_AND_PREVIEW = "SWAP_MAIN_AND_PREVIEW";
    StreamsActions.MOVE_TO_OMNI = "MOVE_TO_OMNI";
    StreamsActions.EXIT_OMNI = "EXIT_OMNI";
    StreamsActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux])
    ], StreamsActions);
    return StreamsActions;
}());
exports.StreamsActions = StreamsActions;
//# sourceMappingURL=streams.actions.js.map