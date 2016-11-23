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
var actions_1 = require('../../actions/actions');
var OverviewComponent = (function () {
    function OverviewComponent(ngRedux, streamsActions, pickerActions) {
        this.ngRedux = ngRedux;
        this.streamsActions = streamsActions;
        this.pickerActions = pickerActions;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var stream = this.ngRedux.select(function (state) { return state.streams[_this.previewContainerId]; });
        stream.subscribe(function (streamState) {
            _this.streamState = streamState;
        });
    };
    OverviewComponent.prototype.addNewStream = function () {
        console.log('adding');
        this.pickerActions.pickNewStream(this.previewContainerId);
    };
    OverviewComponent.prototype.refreshStream = function () {
        console.log('refreshing');
        this.streamsActions.refreshStream(this.previewContainerId);
    };
    OverviewComponent.prototype.deleteStream = function () {
        console.log('deleting');
        this.streamsActions.deleteStream(this.previewContainerId);
    };
    OverviewComponent.prototype.moveStreamToPreview = function () {
        console.log('moving to prev');
        if (this.streamState.position !== 'OMNI') {
            if (this.streamState.position !== 'PREVIEW') {
                this.streamsActions.moveToPreview(this.previewContainerId);
            }
            else {
                this.streamsActions.moveToOverview(this.previewContainerId);
            }
        }
    };
    OverviewComponent.prototype.showFastPreview = function () {
        if (this.streamState.position === 'OVERVIEW') {
            this.streamsActions.moveToQuickPreview(this.previewContainerId);
        }
    };
    OverviewComponent.prototype.hideFastPreview = function () {
        if (this.streamState.position === 'QUICK_PREVIEW') {
            this.streamsActions.moveToOverview(this.previewContainerId);
        }
    };
    OverviewComponent.prototype.moveStreamToMain = function () {
        console.log('moving to main');
        if (this.streamState.position !== 'OMNI') {
            if (this.streamState.position !== 'MAIN') {
                this.streamsActions.moveToMain(this.previewContainerId);
            }
            else {
                this.streamsActions.moveToOverview(this.previewContainerId);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], OverviewComponent.prototype, "previewContainerId", void 0);
    OverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-overview',
            templateUrl: 'overview.component.html',
            styleUrls: ['overview.component.css']
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, actions_1.StreamsActions, actions_1.PickerActions])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map