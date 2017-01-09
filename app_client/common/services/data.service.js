angular.module('app')
.service('appData', appData);

appData.$inject = ['$http', 'authentication'];

function appData ($http, authentication) {

  var getProfile = function () {
    return $http.get('/api/profile', {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      }
    });
  };

  return {
    getProfile : getProfile
  };
}