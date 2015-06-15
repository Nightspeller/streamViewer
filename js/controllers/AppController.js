(function () {
    app.controller('appController', ['$scope', 'ChatService', function($scope, ChatService) {
        Twitch.init({clientId: 'aoj81mhxdidmwxqw05lm73wt7s2p3sg'}, function(error, status) {
            if (error) {
                console.log(error);
            }

            $scope.loginButtonClicked = function () {
                Twitch.login({
                    scope: ['user_read', 'channel_read', 'chat_login']
                });
            };

           /* if (status.authenticated) {
                ChatService.currentConnection.auth = 'oauth:'+status.token;
                console.log('authenticated!')
            }*/

            Twitch.api({method: 'oauth2/token'}, function(error, data) {
                console.log(data);
            });

            console.log(error, status);
        });
    }]);
})();