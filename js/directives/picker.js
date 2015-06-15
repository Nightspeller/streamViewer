(function () {
    app.directive('picker', ['PickerService', function(PickerService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/picker.html',
            controller: function($scope) {
                $scope.hidePicker = function () {
                    PickerService.resetState();
                };
                $scope.cardClicked = function (card) {
                    PickerService.setCurrentState(card.nextState);
                };
                $scope.back = function () {
                    PickerService.returnToPrevState();
                };

                $scope.$watch(PickerService.getContent, function (newValue, oldValue) {
                    $scope.content = newValue;
                });

                $scope.$watch(PickerService.isBackStateAvailable, function () {
                    $scope.backStateAvailable = PickerService.isBackStateAvailable();
                });

                $scope.$watch(PickerService.isShowPicker, function (newValue) {
                    $scope.show = newValue;
                });
            }
        };
    }]);
})();