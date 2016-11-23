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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var TwitchService = (function () {
    function TwitchService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Accept', 'application/vnd.twitchtv.v5+json');
        this.headers.append('Client-ID', 'aoj81mhxdidmwxqw05lm73wt7s2p3sg');
    }
    TwitchService.prototype.getGames = function (amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://api.twitch.tv/kraken/games/top?limit=" + amount + "&offset=" + page * amount, { headers: _this.headers }).toPromise().then(function (response) {
                resolve(TwitchService.transformGamesToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    TwitchService.prototype.getFeaturedStreams = function (amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://api.twitch.tv/kraken/streams?limit=" + amount + "&offset=" + page * amount, { headers: _this.headers }).toPromise().then(function (response) {
                resolve(TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    TwitchService.prototype.getStreamsForGame = function (amount, page, game) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://api.twitch.tv/kraken/streams?game=" + game + "&limit=" + amount + "&offset=" + page * amount, { headers: _this.headers }).toPromise().then(function (response) {
                resolve(TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    TwitchService.prototype.searchForGame = function (query, amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://api.twitch.tv/kraken/search/games?query=" + query + "&limit=" + amount + "&offset=" + page * amount + "&live=true", { headers: _this.headers }).toPromise().then(function (response) {
                var rawData = response.json();
                console.log('games', rawData);
                var pickerDisplayGroup;
                pickerDisplayGroup = {
                    image: '../../assets/images/twitch-logo.jpg',
                    title: 'Twitch.tv',
                    subtitle: 'Featured games',
                    description: 'Featured games',
                    headerLeadsTo: '',
                    itemLeadsTo: 'tw-streams-search',
                    items: []
                };
                for (var i = 0; i < rawData.games.length; i++) {
                    pickerDisplayGroup.items.push({
                        image: rawData.games[i].box.medium,
                        title: rawData.games[i].name,
                        subtitle: rawData.games[i].popularity + " viewers",
                        description: '',
                        code: rawData.games[i].name,
                        playerHtml: '',
                        chatHtml: ''
                    });
                }
                resolve(pickerDisplayGroup);
            });
        });
    };
    ;
    TwitchService.prototype.searchForStreamer = function (query, amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://api.twitch.tv/kraken/search/streams?query=" + query + "&limit=" + amount + "&offset=" + page * amount, { headers: _this.headers }).toPromise().then(function (response) {
                resolve(TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    TwitchService.transformGamesToPickerDisplayGroup = function (rawData) {
        var pickerDisplayGroup;
        pickerDisplayGroup = {
            image: '../../assets/images/twitch-logo.jpg',
            title: 'Twitch.tv',
            subtitle: 'Featured games',
            description: 'Featured games',
            headerLeadsTo: 'tw-games',
            itemLeadsTo: 'tw-streams-search',
            items: []
        };
        for (var i = 0; i < rawData.top.length; i++) {
            pickerDisplayGroup.items.push({
                image: rawData.top[i].game.box.medium,
                title: rawData.top[i].game.name,
                subtitle: rawData.top[i].viewers + " viewers at " + rawData.top[i].channels + " channels",
                description: '',
                code: rawData.top[i].game.name,
                playerHtml: '',
                chatHtml: ''
            });
        }
        return pickerDisplayGroup;
    };
    TwitchService.transformStreamsToPickerDisplayGroup = function (rawData) {
        console.log('streams', rawData);
        var pickerDisplayGroup;
        pickerDisplayGroup = {
            image: '../../assets/images/twitch-logo.jpg',
            title: 'Twitch.tv',
            subtitle: 'Top streams',
            description: 'Top streams',
            headerLeadsTo: 'tw-streams',
            itemLeadsTo: 'picking-done',
            items: []
        };
        for (var i = 0; i < rawData.streams.length; i++) {
            pickerDisplayGroup.items.push({
                image: rawData.streams[i].preview.medium,
                title: "<span class=\"highlighted\">" + rawData.streams[i].channel.display_name + "</span> playing " + rawData.streams[i].channel.game,
                subtitle: rawData.streams[i].viewers + ' viewers',
                description: rawData.streams[i].channel.status,
                code: rawData.streams[i].channel.name,
                playerHtml: "<iframe src=\"https://player.twitch.tv/?channel=" + rawData.streams[i].channel.name + "\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"0\" allowfullscreen=\"true\"></iframe>",
                chatHtml: "<iframe src=\"https://www.twitch.tv/" + rawData.streams[i].channel.name + "/chat\" width=\"100%\" style=\"flex-grow: 1\" frameborder=\"0\" scrolling=\"0\" allowfullscreen=\"true\"></iframe>"
            });
        }
        return pickerDisplayGroup;
    };
    TwitchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TwitchService);
    return TwitchService;
}());
exports.TwitchService = TwitchService;
//# sourceMappingURL=twitch.service.js.map