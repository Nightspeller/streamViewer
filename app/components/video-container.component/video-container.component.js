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
var platform_browser_1 = require("@angular/platform-browser");
var ng2_redux_1 = require('ng2-redux');
var Observable_1 = require('rxjs/Observable');
var VideoContainerComponent = (function () {
    function VideoContainerComponent(ngRedux, domSanitizer) {
        this.ngRedux = ngRedux;
        this.domSanitizer = domSanitizer;
    }
    VideoContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.streams.subscribe(function (streamsState) {
            console.log(streamsState);
            _this.adjustContainer(_this.ngRedux.getState().layout, streamsState);
            if (JSON.stringify(_this.videoElement) !== JSON.stringify(_this.domSanitizer.bypassSecurityTrustHtml(streamsState[_this.videoContainerId].playerHtml))) {
                _this.videoElement = _this.domSanitizer.bypassSecurityTrustHtml(streamsState[_this.videoContainerId].playerHtml);
            }
        });
        this.layout.subscribe(function (layout) {
            _this.adjustContainer(layout, _this.ngRedux.getState().streams);
        });
    };
    VideoContainerComponent.prototype.adjustContainer = function (layout, streamsState) {
        this.position = streamsState[this.videoContainerId].position;
        var doubleVideoMode = false;
        var conditionCounter = 0;
        for (var i = 0; i < 4; i++) {
            if (streamsState[i].position === 'MAIN' || streamsState[i].position === 'PREVIEW' || streamsState[i].position === 'QUICK_PREVIEW')
                conditionCounter++;
        }
        if (conditionCounter > 1)
            doubleVideoMode = true;
        switch (this.position) {
            case '':
            case 'OVERVIEW':
                if (layout.showOverview) {
                    this.shown = true;
                    this.top = layout.overviewsContainers[this.videoContainerId].top;
                    this.left = layout.overviewsContainers[this.videoContainerId].left;
                    this.width = layout.overviewsContainers[this.videoContainerId].width - 2;
                    this.height = layout.overviewsContainers[this.videoContainerId].height - 2;
                }
                else {
                    this.shown = false;
                }
                break;
            case 'MAIN':
                if (doubleVideoMode) {
                    this.top = layout.mainContainer.bottom - layout.previewContainer.height - 2;
                    this.left = layout.mainContainer.right - layout.previewContainer.width - 2;
                    this.width = layout.previewContainer.width - 2;
                    this.height = layout.previewContainer.height - 2;
                }
                else {
                    this.top = layout.mainContainer.top;
                    this.left = layout.mainContainer.left;
                    this.width = layout.mainContainer.width - 2;
                    this.height = layout.mainContainer.height - 2;
                }
                break;
            case 'QUICK_PREVIEW':
            case 'PREVIEW':
                if (doubleVideoMode) {
                    this.top = layout.previewContainer.top;
                    this.left = layout.previewContainer.left;
                    this.width = layout.previewContainer.width - 2;
                    this.height = layout.previewContainer.height - 2;
                }
                else {
                    this.top = layout.mainContainer.top;
                    this.left = layout.mainContainer.left;
                    this.width = layout.mainContainer.width - 2;
                    this.height = layout.mainContainer.height - 2;
                }
                break;
            case 'OMNI':
                this.shown = true;
                this.top = layout.mainContainer.top + layout.mainContainer.height / 2 * Math.floor(this.videoContainerId / 2);
                this.left = layout.mainContainer.left + layout.mainContainer.width / 2 * (this.videoContainerId % 2);
                this.width = layout.mainContainer.width / 2 - 2;
                this.height = layout.mainContainer.height / 2 - 2;
                break;
        }
    };
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], VideoContainerComponent.prototype, "streams", void 0);
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], VideoContainerComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VideoContainerComponent.prototype, "videoContainerId", void 0);
    VideoContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-video-container',
            templateUrl: 'video-container.component.html',
            styleUrls: ['video-container.component.css']
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, platform_browser_1.DomSanitizer])
    ], VideoContainerComponent);
    return VideoContainerComponent;
}());
exports.VideoContainerComponent = VideoContainerComponent;
//# sourceMappingURL=video-container.component.js.map