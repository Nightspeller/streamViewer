(function () {
    app.service('PickerService', ['$http', 'StreamsStateManager', function ($http, StreamsStateManager) {
        var statesStack = ['sources'];
        var pickingFor = null;
        var showPicker = false;
        var content = [
            {
                title: 'Twitch.tv',
                description: 'Largest gaming service',
                img: 'img/logo_twitch.jpg',
                nextState: 'twitchGames'
            },{
                title: 'Cybergame.tv',
                description: 'Russian gaming service',
                img: 'img/logo_cybergame.jpg',
                nextState: {state: 'pickingDone'}
            },{
                title: 'Goodgame.tv',
                description: 'Goodgame sucks',
                img: 'img/logo_goodgame.png',
                nextState: {state: 'pickingDone'}
            }
        ];

        this.isShowPicker = function () {
            return showPicker;
        };

        this.getCurrentState = function () {
            return statesStack[statesStack.length-1];
        };

        this.isBackStateAvailable = function () {
            return statesStack[statesStack.length-1] !== 'sources';
        };

        this.setCurrentState = function (state) {
            statesStack.push(state);
            this.updateContent();
        };

        this.returnToPrevState = function () {
            statesStack.pop();
            this.updateContent();
        };

        this.resetState = function () {
            statesStack = ['sources'];
            this.updateContent();
            pickingFor = null;
            showPicker = false;
        };

        this.pickStreamFor = function (id) {
            pickingFor = id;
            showPicker = true;
        };

        this.getContent = function () {
            return content;
        };

        this.updateContent = function(){
            var currentState = statesStack[statesStack.length-1];
            if (currentState === 'sources') {
                content = [
                    {
                        title: 'Twitch.tv',
                        description: 'Largest gaming service',
                        img: 'img/logo_twitch.jpg',
                        nextState: 'twitchGames'
                    },{
                        title: 'Cybergame.tv',
                        description: 'Russian gaming service',
                        img: 'img/logo_cybergame.jpg',
                        nextState: {state: 'pickingDone'}
                    },{
                        title: 'Goodgame.tv',
                        description: 'Goodgame sucks',
                        img: 'img/logo_goodgame.png',
                        nextState: {state: 'pickingDone'}
                    }
                ];
            }
            if (currentState === 'twitchGames') {
                content = [];
                var url = "https://api.twitch.tv/kraken/games/top?limit=15&offset="+0*15+"&callback=JSON_CALLBACK";
                $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
                $http.jsonp(url).success(function(data) {
                    var tempContent = [];
                    for (var i = 0; i < data.top.length; i++) {
                        var game = {};
                        game.title = data.top[i].game.name;
                        game.description = data.top[i].viewers+' viewers';
                        game.img = data.top[i].game.box.medium;
                        game.nextState = {state: 'twitchGame', game: data.top[i].game.name};
                        tempContent.push(game);
                    }
                    content = tempContent;
                })
                .error(function(data) {
                    console.error(data);
                });
            }
            if (currentState.state === 'twitchGame') {
                content = [];
                var url = "https://api.twitch.tv/kraken/streams?game=" + currentState.game + "&limit=12&offset=" + 12*0+"&callback=JSON_CALLBACK";
                $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
                $http.jsonp(url).success(function(data) {
                    var tempContent = [];
                    for (var i = 0; i < data.streams.length; i++) {
                        var stream = {};
                        stream.title = data.streams[i].channel.status;
                        stream.description = data.streams[i].channel.name +' ' + data.streams[i].viewers;
                        stream.img = data.streams[i].preview.medium;
                        stream.nextState = {state: 'pickingDone', channel: data.streams[i].channel.name};
                        tempContent.push(stream);
                    }
                    content = tempContent;
                })
                .error(function(data) {
                    console.error(data);
                });
            }
            if (currentState.state === 'pickingDone') {
                StreamsStateManager.streams[pickingFor].channel = currentState.channel;
                this.resetState();
            }
        }
    }]);
})();