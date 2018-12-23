
function isAvailable() {
    window.plugins.googleplus.isAvailable(function(avail) {alert(avail)});
  }
  function login() {
    window.plugins.googleplus.login(
        {},
        function (obj) {
          localStorage.image = obj.imageUrl;
          localStorage.feedback = obj.displayName;
          console.log("obj.displayName");
          document.querySelector("#image").src = localStorage.getItem("image");
          document.querySelector("#image").style.visibility = 'visible';
         // document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
          document.querySelector("#feedback").innerHTML = obj.displayName;
          localStorage.usuario=obj.email;
          localStorage.nombre_fono=obj.displayName;
          var mainView = app.views.create('.view-main', {
            url: '/'
          });
        },
        function (msg) {
          //document.querySelector("#feedback").innerHTML = "error: " + msg;
          app.dialog.alert("Verifique su conexión a internet","");
          app.loginScreen.open("#my-login-screen");
        }
    );
  }
  function trySilentLogin() {
    window.plugins.googleplus.trySilentLogin(
        {},
        function (obj) {
          localStorage.image = obj.imageUrl;
          localStorage.feedback = obj.displayName;

          document.querySelector("#image").src = obj.imageUrl;
          document.querySelector("#image").style.visibility = 'visible';
          //document.querySelector("#feedback").innerHTML = "Silent hi, " + obj.displayName + ", " + obj.email;
          document.querySelector("#feedback").innerHTML = obj.displayName;
          localStorage.nombre_fono=obj.displayName;
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = "error: " + msg;
        }
    );
  }
  function logout() {
    window.plugins.googleplus.logout(
        function (msg) {
          document.querySelector("#image").style.visibility = 'hidden';
          document.querySelector("#feedback").innerHTML = msg;
          app.dialog.alert("Cuenta desvinculada","");
          app.loginScreen.open("#my-login-screen");
          localStorage.image="";
          localStorage.feedback="";
          
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = msg;
          document.querySelector("#image").style.visibility = 'hidden';
          app.dialog.alert("Cuenta desvinculada","");
          localStorage.image="";
          localStorage.feedback="";
          app.loginScreen.open("#my-login-screen");
        }
    );
  }
  function disconnect() {
    window.plugins.googleplus.disconnect(
        function (msg) {
          document.querySelector("#image").style.visibility = 'hidden';
          document.querySelector("#feedback").innerHTML = msg;
          app.loginScreen.open("#my-login-screen");
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = msg;
          app.loginScreen.open("#my-login-screen");
        }
    );
  }
  window.onerror = function(what, line, file) {
    alert(what + '; ' + line + '; ' + file);
  };
  function handleOpenURL (url) {
    document.querySelector("#feedback").innerHTML = "App was opened by URL: " + url;
  }