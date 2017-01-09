angular.module('app', ['ngRoute'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/auth/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/profile', {
      templateUrl: '/profile/profile.view.html',
      controller: 'profileCtrl',
      controllerAs: 'vm'
    })
    .otherwise({rredirectTo: '/'});

  // use HTML5 History API
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.run(function ($rootScope, $location, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
      $location.path('/');
    }
  });
});


