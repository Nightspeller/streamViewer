(function () {
    app.service('ChatService', ['$http', '$websocket', 'StreamsStateManager', function ($http, $websocket, StreamsStateManager) {

        var self = this;
        this.messages = [];

        var currentConnection = {
            userName: 'serg_nightspeller',
            channel: '#draskyl',
            auth: 'oauth:hkifjxlknde3rs2njdagwll5lf2wj5'
        };

        var dataStream = $websocket('ws://nightspeller.net:8080');

        dataStream.onOpen(function(data){
            console.log('Opened: ', data);
            dataStream.send(JSON.stringify(currentConnection));
        });

        dataStream.onMessage(function(message) {
           // console.log('message received', message);
            //collection.push(JSON.parse(message.data));
            message = JSON.parse(message.data);
            self.messages.push({author: message.author, text: message.text});
            if (self.messages.length > 30) self.messages.shift();
        });

        this.sendMessage = function (data) {
            dataStream.send(JSON.stringify({text: data}));
            self.messages.push({author: currentConnection.userName, text: data});
        };

        this.updateChannel = function (channel) {
            currentConnection.channel = channel;
            this.messages = [];
            dataStream.send(JSON.stringify(currentConnection));
        }
    }]);
})();