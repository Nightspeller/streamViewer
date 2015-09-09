(function () {
    angular.module(appConfig.appName).directive('controls', ['StreamsStateManager', function (StreamsStateManager) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/controls.html',
            controller: function ($scope) {
                $scope.showAllControls = false;


                $scope.showControls = function () {
                    $scope.showAllControls = !$scope.showAllControls;
                }

                $scope.toggleStreamList = function () {
                    StreamsStateManager.showStreamOverviewList = !StreamsStateManager.showStreamOverviewList;
                }

                var isFullscreen = false;
                $scope.toggleFullscreenMode = function () {
                    if (isFullscreen) {
                        exitFullscreen();
                        isFullscreen = false;
                    } else {
                        enterFullscreen(document.documentElement);
                        isFullscreen = true;
                    }
                }

                $scope.toggleChat = function () {
                    StreamsStateManager.showChat = !StreamsStateManager.showChat;
                }

                $scope.swapMainAndPreview = function () {
                    StreamsStateManager.swapActiveAndPreview();
                }

                $scope.showAllStreams = function () {
                    var msgBox = new Windows.UI.Popups.MessageDialog('Feature is under development. This will show all 4 streams at main screen.');
                    msgBox.showAsync();
                }

                $scope.showAbout = function () {
                    var msgBox = new Windows.UI.Popups.MessageDialog('SreamViewer for Windows 10 by Serg Nigths. Feedback is welcomed: serj.nights@live.com');
                    msgBox.showAsync();
                }

                function enterFullscreen(element) {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }

                function exitFullscreen() {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            },
            link: function (scope, elem, attrs) {
               
            }
        };
    }]);
})();