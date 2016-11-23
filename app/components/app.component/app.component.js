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
var AppComponent = (function () {
    function AppComponent(layoutActions, element) {
        this.layoutActions = layoutActions;
        this.element = element;
        this.showOverview = true;
        this.showChat = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutActions.layoutChanged(this.element.nativeElement);
        this.layout.subscribe(function (layout) {
            if (_this.showChat !== layout.showChat) {
                _this.showChat = layout.showChat;
                setTimeout(function () {
                    _this.layoutActions.layoutChanged(_this.element.nativeElement);
                }, 0);
            }
            if (_this.showOverview !== layout.showOverview) {
                _this.showOverview = layout.showOverview;
                setTimeout(function () {
                    _this.layoutActions.layoutChanged(_this.element.nativeElement);
                }, 0);
            }
        });
    };
    AppComponent.prototype.onResize = function () {
        this.layoutActions.layoutChanged(this.element.nativeElement);
    };
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], AppComponent.prototype, "streams", void 0);
    __decorate([
        ng2_redux_1.select(), 
        __metadata('design:type', Observable_1.Observable)
    ], AppComponent.prototype, "layout", void 0);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [actions_1.LayoutActions, core_1.ElementRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map