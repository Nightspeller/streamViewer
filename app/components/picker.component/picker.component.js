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
var PickerComponent = (function () {
    function PickerComponent(ngRedux, pickerActions) {
        this.ngRedux = ngRedux;
        this.pickerActions = pickerActions;
        this.searchQuery = '';
    }
    PickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentData = this.ngRedux.getState().picker.pickerData;
        this.picker.subscribe(function (picker) {
            _this.pickerShown = picker.pickerShown;
            _this.currentState = picker.pickerCurrentState;
            _this.currentData = picker.pickerData;
        });
    };
    PickerComponent.prototype.groupHeaderClicked = function (group) {
        this.pickerActions.pickerGroupClicked(group);
    };
    PickerComponent.prototype.groupItemClicked = function (group, item) {
        this.pickerActions.pickerItemClicked(group, item);
    };
    PickerComponent.prototype.back = function () {
        this.pickerActions.goBack();
    };
    PickerComponent.prototype.searchChanged = function (searchQuery) {
        this.pickerActions.pickerSearch(searchQuery);
    };
    PickerComponent.prototype.closePicker = function () {
        this.pickerActions.closePicker();
    };
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], PickerComponent.prototype, "streams", void 0);
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], PickerComponent.prototype, "picker", void 0);
    PickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-picker',
            templateUrl: 'picker.component.html',
            styleUrls: ['picker.component.css']
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, actions_1.PickerActions])
    ], PickerComponent);
    return PickerComponent;
}());
exports.PickerComponent = PickerComponent;
//# sourceMappingURL=picker.component.js.map