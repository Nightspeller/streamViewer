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
var YoutubeService = (function () {
    function YoutubeService(http) {
        this.http = http;
    }
    YoutubeService.prototype.getFeaturedVideos = function (amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&maxResults=" + amount + "&chart=mostPopular&key=AIzaSyCwDuzMYGZ2daIs7NLbeQmSMYy8tvt3Nrc")
                .toPromise().then(function (response) {
                resolve(YoutubeService.transformVideosToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    YoutubeService.prototype.search = function (query, amount, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("https://content.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&type=video&key=AIzaSyCwDuzMYGZ2daIs7NLbeQmSMYy8tvt3Nrc")
                .toPromise().then(function (response) {
                resolve(YoutubeService.transformVideosToPickerDisplayGroup(response.json()));
            });
        });
    };
    ;
    YoutubeService.transformVideosToPickerDisplayGroup = function (rawData) {
        var pickerDisplayGroup;
        pickerDisplayGroup = { image: '../../assets/images/youtube-logo.png',
            title: 'YouTube',
            subtitle: 'Trending videos',
            description: 'Most popular videos',
            headerLeadsTo: 'youtube',
            itemLeadsTo: 'picking-done',
            items: []
        };
        for (var i = 0; i < rawData.items.length; i++) {
            var subtitle = rawData.items[i].statistics ? rawData.items[i].statistics.viewCount + ' views, ' + rawData.items[i].statistics.likeCount + ' likes' : 'blah';
            var code = typeof rawData.items[i].id === 'object' ? rawData.items[i].id.videoId : rawData.items[i].id;
            pickerDisplayGroup.items.push({
                image: rawData.items[i].snippet.thumbnails.medium.url,
                title: rawData.items[i].snippet.title,
                subtitle: subtitle,
                description: '',
                code: code,
                playerHtml: "<iframe src=\"https://www.youtube.com/embed/" + code + "\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"0\" allowfullscreen=\"true\"></iframe>",
                chatHtml: ''
            });
        }
        return pickerDisplayGroup;
    };
    YoutubeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], YoutubeService);
    return YoutubeService;
}());
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map