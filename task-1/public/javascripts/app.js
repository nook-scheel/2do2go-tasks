angular.module("app",[])
  .controller('FormController', function($scope, $http) {
    $scope.reddit = { fields: [], taskNumber: 1, type: 'csv', sort: 'asc', sortPath: '', url: '', special: ';', data: [] };
    var vm = this;
    vm.request = function () {
      $http.post('/proxy', $scope.reddit).then(function (res) {
        $scope.reddit.data = res.data;
      });
    };
    vm.add = function () {
      $scope.reddit.fields.push({});
    };
    vm.fixtures = function () {
      $scope.reddit.url = 'https://www.reddit.com/r/javascript/.json';
      $scope.reddit.sortPath = 'ups';
      $scope.reddit.fields.push({ path: 'domain', name: 'Domain' });
      $scope.reddit.fields.push({ path: 'ups', name: 'UPS' });
    };
    vm.remove = function (index) {
      $scope.reddit.fields.splice(index, 1);
    }
  })
