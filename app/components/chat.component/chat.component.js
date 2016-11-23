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
var ChatComponent = (function () {
    function ChatComponent(ngRedux, domSanitizer) {
        this.ngRedux = ngRedux;
        this.domSanitizer = domSanitizer;
        this.chatElements = [];
        this.shownChat = 0;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _loop_1 = function(i) {
            var stream = this_1.ngRedux.select(function (state) { return state.streams[i]; });
            stream.subscribe(function (streamState) {
                if (JSON.stringify(_this.chatElements[i]) !== JSON.stringify(_this.domSanitizer.bypassSecurityTrustHtml(streamState.chatHtml))) {
                    _this.chatElements[i] = _this.domSanitizer.bypassSecurityTrustHtml(streamState.chatHtml);
                }
                if (streamState.position === 'MAIN')
                    _this.shownChat = i;
            });
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    ChatComponent.prototype.selectChat = function (index) {
        this.shownChat = index;
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sv-chat',
            templateUrl: 'chat.component.html',
            styleUrls: ['chat.component.css']
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, platform_browser_1.DomSanitizer])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map