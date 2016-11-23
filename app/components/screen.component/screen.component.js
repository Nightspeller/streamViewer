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
var Observable_1 = require('rxjs/Observable');
var actions_1 = require('../../actions/actions');
var fullScreenLib = require('../../../assets/vendor/js/screenfull.js');
var ScreenComponent = (function () {
    function ScreenComponent(ngRedux, streamsActions, layoutActions) {
        this.ngRedux = ngRedux;
        this.streamsActions = streamsActions;
        this.layoutActions = layoutActions;
    }
    ScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.streams.subscribe(function (streamsState) {
            streamsState[0].position === 'OMNI' ? _this.omniMode = true : _this.omniMode = false;
            /*this.adjustContainer(this.ngRedux.getState().layout, streamsState);

            if (this.videoCode !== streamsState[this.videoContainerId].videoCode) {
                this.source = streamsState[this.videoContainerId].source;
                this.videoCode = streamsState[this.videoContainerId].videoCode;
                if (this.source === 'twitch') this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${this.videoCode}`);
                if (this.source === 'youtube') this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoCode}`);
            }*/
        });
        /*this.layout.subscribe((layout: any) => {
            this.adjustContainer(layout, this.ngRedux.getState().streams)
        })*/
        if (fullScreenLib.enabled) {
            document.addEventListener(fullScreenLib.raw.fullscreenchange, function () {
                _this.fullScreenMode = fullScreenLib.isFullscreen;
            });
        }
    };
    ScreenComponent.prototype.toggleControls = function () {
        this.showControls = !this.showControls;
    };
    ScreenComponent.prototype.toggleOverviewList = function () {
        this.layoutActions.toggleOverview();
    };
    ScreenComponent.prototype.toggleChat = function () {
        this.layoutActions.toggleChat();
    };
    ScreenComponent.prototype.swapMainAndPreview = function () {
        this.streamsActions.swapMainAndPreview();
    };
    ScreenComponent.prototype.toggleFullScreen = function () {
        if (fullScreenLib.enabled) {
            fullScreenLib.toggle();
        }
    };
    ScreenComponent.prototype.showAllStreams = function () {
        this.omniMode ? this.streamsActions.exitOmni() : this.streamsActions.moveToOmni();
    };
    ScreenComponent.prototype.showAbout = function () {
        alert('StreamViewer for Web by Serg Nigths. Feedback is welcomed: serj.nights@live.com');
    };
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], ScreenComponent.prototype, "streams", void 0);
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], ScreenComponent.prototype, "layout", void 0);
    ScreenComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-screen',
            templateUrl: 'screen.component.html',
            styleUrls: ['screen.component.css']
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, actions_1.StreamsActions, actions_1.LayoutActions])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
//# sourceMappingURL=screen.component.js.map