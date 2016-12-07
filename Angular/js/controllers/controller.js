/**
 * Created by wangj on 2016/12/3.
 */

var myAppModule = angular.module('myApp',[]);
var scope;
myAppModule.controller('HelloController', function($scope) {
    $scope.greeting = {text: 'hello'};
    $scope.items = [
        {title: 'a'},
        {title: 'b'},
        {title: 'c'}
    ];
    $scope.youCheckedit = true;
    $scope.funding = {startingEstimate: 0};
    var computeNeeded = function() {
        $scope.funding.needed = $scope.funding.startingEstimate * 10;
    };
    $scope.$watch('funding.startingEstimate', computeNeeded);
    scope = $scope;
});