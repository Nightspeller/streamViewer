(function () {
    app.directive('mainScreen', ['StreamsStateManager', function(StreamsStateManager) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/main-screen.html',
            controller: function($scope){
                $scope.activeStream = StreamsStateManager.activeStream;
                $scope.previewStream = StreamsStateManager.previewStream;
            },
            link: function (scope, elem, attrs) {
            }
        };
    }]);
})();