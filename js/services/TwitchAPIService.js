(function () {
    app.service('TwitchAPIService', ['$http', 'StreamsStateManager', function ($http, StreamsStateManager) {

        this.getAcessToken = function (channelName) {
            WinJS.xhr({
                url: 'http://api.twitch.tv/api/channels/' + channelName + '/access_token',
                responseType: "json"
            }).done(function completed(result) {
                console.log(result);
                var response = JSON.parse(result.response);
                //  var videoElement = document.getElementById(playerId);
                var url = 'http://usher.justin.tv/api/channel/hls/' + channelName + '.m3u8?token=' + response.token + '&sig=' + response.sig;
                // videoElement.setAttribute("src", url)
            });
        };


    }]);
})();