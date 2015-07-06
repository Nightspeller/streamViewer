(function () {
    angular.module(appConfig.appName).service('TwitchAPIService', ['$q', '$http', function ($q, $http) {

        this.prepareChannel = function (channelId, channelName) {
            if (channelName) {
                return $q(function (resolve, reject) {
                    if (typeof WinJS !== 'undefined') {
                        WinJS.xhr({
                            url: 'http://api.twitch.tv/api/channels/' + channelName + '/access_token',
                            responseType: "json"
                        }).done(function completed(result) {
                            var response = JSON.parse(result.response);
                            var url = 'http://usher.justin.tv/api/channel/hls/' + channelName + '.m3u8?token=' + response.token + '&sig=' + response.sig;
                            resolve(url);
                        });
                    } else {
                        resolve(channelName);
                    }
                })
            }
        };

        this.getGames = function (amount, page) {
            var url = "https://api.twitch.tv/kraken/games/top?limit=" + amount + "&offset=" + page * amount;
            return $q(function(resolve, reject){
                if (typeof WinJS !== 'undefined') {
                    WinJS.xhr({
                        url: url
                    }).done(function completed(data) {
                        data = JSON.parse(data.response);
                        resolve(data);
                    });
                } else {
                    url += '&callback=JSON_CALLBACK';
                    $http.jsonp(url).success(function(data) {
                        resolve(data);
                    })
                }
            })
        };

        this.getStreamsForGame = function (amount, page, game) {
            var url = "https://api.twitch.tv/kraken/streams?game=" + game + "&limit=" + amount + "&offset=" + page * amount;
            return $q(function (resolve, reject) {
                if (typeof WinJS !== 'undefined') {
                    WinJS.xhr({
                        url: url
                    }).done(function completed(data) {
                        data = JSON.parse(data.response);
                        resolve(data);
                    });
                } else {
                    url += '&callback=JSON_CALLBACK';
                    $http.jsonp(url).success(function(data) {
                        resolve(data);
                    })
                }
            });
        };
    }]);
})();