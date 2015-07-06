var app = angular.module(appConfig.appName, appConfig.dependencies).config(['$compileProvider', function ($compileProvider) {
  //  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
}]);

//angular.bootstrap(document, [appConfig.appName]);