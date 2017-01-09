angular.module('app')
.controller('profileCtrl', profileCtrl);

profileCtrl.$inject = ['$location', 'appData'];
function profileCtrl($location, appData) {
  var vm = this;

  vm.user = {};

  appData.getProfile()
    .success(function(data) {
      vm.user = data;
    })
    .error(function (err) {
      console.log(err);
    });
}