angular.module('syrupApp').controller('loginControl', function($scope, rgsService, $state, $auth) {


  $scope.createNew = function() {
    swal.setDefaults({
      confirmButtonText: 'Next &rarr;',
      confirmButtonColor: 'RGB(204, 70, 77)',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3', '4', '5', '6'],
      // inputValidator: function(value) {
      //   return new Promise(function(resolve, reject) {
      //     if (value) {
      //       resolve();
      //     } else {
      //       reject('You need to enter a value!');
      //     }
      //   });
      // }
    });

    var newUserArr = [];
    var saveNewUserInput = function(input) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (input === 'duh') {
            reject('no duh');
          } else {
            newUserArr.push(input);
            resolve();
          }
        }, 88);
      });
    };
    var steps = [
      {
        title: 'Step 1',
        text: 'Enter your first name',
        input: 'text',
        // preConfirm: saveNewUserInput(text),
        preConfirm: function(text) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (text === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(text);
                resolve();
              }
            }, 88);
          });
        }
      },
      {
        title: 'Step 2',
        text: 'Enter your last name',
        input: 'text',
        // preConfirm: saveNewUserInput(text),
        preConfirm: function(text) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (text === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(text);
                resolve();
              }
            }, 88);
          });
        }
      },
      {
        title: 'Step 3',
        text: 'Enter your address',
        input: 'text',
        // preConfirm: saveNewUserInput(text),
        preConfirm: function(text) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (text === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(text);
                resolve();
              }
            }, 88);
          });
        }
      },
      {
        title: 'Step 4',
        text: 'Enter your zip code',
        input: 'number',
        // preConfirm: saveNewUserInput(number),
        preConfirm: function(number) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (number === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(number);
                resolve();
              }
            }, 88);
          });
        }
      },
      {
        title: 'Step 5',
        text: 'Enter a username',
        input: 'text',
        // preConfirm: saveNewUserInput(text),
        preConfirm: function(text) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (text === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(text);
                resolve();
              }
            }, 88);
          });
        }
      },
      {
        title: 'Step 6',
        text: 'Enter a password',
        input: 'password',
        // preConfirm: saveNewUserInput(password),
        preConfirm: function(password) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              if (password === 'duh') {
                reject('no duh');
              } else {
                newUserArr.push(password);
                resolve();
              }
            }, 88);
          });
        }
      }
    ];

    swal.queue(steps)
      .then(function() {
        console.log(newUserArr);
        var newUserObj = {
          firstname: newUserArr[0],
          lastname: newUserArr[1],
          address: newUserArr[2],
          zip: newUserArr[3],
          username: newUserArr[4],
          password: newUserArr[5]
        };
        rgsService.postUser(newUserObj);
        setTimeout(function() {
          $scope.loginLocal(newUserObj.username, newUserObj.password);
        }, 500);
      })
      .then(function() {
        swal.resetDefaults();
        swal({
          title: 'Welcome!',
          confirmButtonText: 'Yay!',
          showCancelButton: false
        });
      },
      function() {
        swal.resetDefaults();
      }
    );
  };



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  AUTHENTICATION
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// $scope.loginLocal = function(username, password) {
//   // $scope.username = username;
//   rgsService.loginLocal({
//     username: username,
//     password: password
//   })
//   .then(function(user) { // Here, response is the user sent from /auth/local endpoint
//     rgsService.user = user;
//     checkUser(user.admin); // Passes admin status into checkUser fn below
//   });
// };


//login w/jsonwebtokens
  // $scope.loginLocal = function(username, password) {
  //   rgsService.loginLocal(username, password);
  // };

   //
   $scope.loginLocal = function(username, password) {
     $auth.login({
       username: username,
       password: password,
     }).then(function (response) {
       if(response.status === 200){
        $auth.setToken(response);
        // rgsService.user = response.data.user;
        rgsService.setUser(response.data.user);
        var user = response.data.user;
        checkUser(user.admin);
       }
     }).catch(function (response) {
       swal({
         title: 'Wrong username or password',
         text: 'Please try again',
         type: 'error',
         timer: 2100
         }
       );
     });
   };



  function checkUser(isAdmin) {
      rgsService.getUser().then(function(user) {
        if (user && isAdmin)  {
          $state.go('admin');
          window.setTimeout(function() {
            $('#first').scrollToStateContainer(); // Scrolls to top in case window is not scroll to position when logging in
          });
          // $('body').addClass('no-scroll');
        } else if (user) {
          $state.go('patron');
        }
        else {
          // $scope.loginHeading = 'Wrong name or password. Try again.';
          // THIS NEVER GETS HIT SINCE AUTH IS REQUIRED BY LOGINLOCAL()
        }

      });
    }

  $scope.logout = function() {
    $auth.logout().then(function(res) {
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };


});
