(function () {
    app.directive('streamOverview', ['StreamsStateManager', 'PickerService', 'TwitchAPIService', function(StreamsStateManager, PickerService, TwitchAPIService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/stream-overview.html',
            scope: {
                show: '=',
                num: '='
            },
            controller: function($scope){
                $scope.previewSelected = StreamsStateManager.previewStream;
                $scope.activeSelected = StreamsStateManager.activeStream;

                $scope.stream = StreamsStateManager.streams[$scope.num];

                $scope.add = function () {
                    PickerService.pickStreamFor($scope.num);
                };
                $scope.refresh = function () {
                    console.log("Refresh clicked");
                    TwitchAPIService.getAcessToken($scope.stream.channel);
                };
                $scope.remove = function () {
                    StreamsStateManager.removeStream($scope.num);
                };
                $scope.preview = function () {
                    StreamsStateManager.setPreviewStream($scope.num);
                };
                $scope.moveToMain = function () {
                    StreamsStateManager.setActiveStream($scope.num);
                };
            },
            link: function (scope, elem, attrs) {

            }
        };
    }]);
})();