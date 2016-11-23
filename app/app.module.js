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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var ng2_redux_1 = require('ng2-redux');
var store_1 = require('./store/store');
var actions_1 = require('./actions/actions');
var app_component_1 = require('./components/app.component/app.component');
var screen_component_1 = require('./components/screen.component/screen.component');
var overview_component_1 = require('./components/overview.component/overview.component');
var chat_component_1 = require('./components/chat.component/chat.component');
var video_container_component_1 = require('./components/video-container.component/video-container.component');
var picker_component_1 = require('./components/picker.component/picker.component');
var twitch_service_1 = require('./services/twitch.service');
var youtube_service_1 = require('./services/youtube.service');
var AppModule = (function () {
    function AppModule(ngRedux) {
        ngRedux.configureStore(store_1.rootReducer, store_1.INITIAL_STATE, [], window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, screen_component_1.ScreenComponent, overview_component_1.OverviewComponent, chat_component_1.ChatComponent, video_container_component_1.VideoContainerComponent, picker_component_1.PickerComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [twitch_service_1.TwitchService, youtube_service_1.YoutubeService, ng2_redux_1.NgRedux, actions_1.StreamsActions, actions_1.LayoutActions, actions_1.PickerActions]
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map