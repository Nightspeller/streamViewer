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
var LayoutActions = (function () {
    function LayoutActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    LayoutActions.prototype.toggleChat = function () {
        this.ngRedux.dispatch({ type: LayoutActions.TOGGLE_CHAT });
    };
    LayoutActions.prototype.toggleOverview = function () {
        this.ngRedux.dispatch({ type: LayoutActions.TOGGLE_OVERVIEW });
    };
    LayoutActions.prototype.layoutChanged = function (element) {
        this.ngRedux.dispatch({ type: LayoutActions.UPDATE_LAYOUT, payload: element });
    };
    LayoutActions.TOGGLE_CHAT = "TOGGLE_CHAT";
    LayoutActions.TOGGLE_OVERVIEW = "TOGGLE_OVERVIEW";
    LayoutActions.UPDATE_LAYOUT = "UPDATE_LAYOUT";
    LayoutActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux])
    ], LayoutActions);
    return LayoutActions;
}());
exports.LayoutActions = LayoutActions;
//# sourceMappingURL=layout.actions.js.map