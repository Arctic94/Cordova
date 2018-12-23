/////?????????????????//////////
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  console.log('devide ready....');
  // if (window.StatusBar) window.StatusBar.hide();
  //AndroidFullScreen.immersiveMode();
}
//////////////////
//var usuario;
localStorage.setItem("usuario", "");
localStorage.setItem("nombre_fono", "");
localStorage.setItem("time_location", localStorage.time_location);
localStorage.setItem("pendiente", "");
localStorage.setItem("rendimiento", "");
console.log(localStorage.time_location);
var sesion_sel;
var sesion_obs;
var db = new PouchDB('pacientes');
var remoteCouch = false;
var juego_sel;
var tipo_dinamica;
var suma = 0;
//console.log(db);
//console.log(JSON.stringify(dump));
db.info().then(function (info) {
  console.log(info);
})
db.createIndex({
  index: { fields: ['fecha', 'id_ses'] }
});
db.createIndex({
  index: { fields: ['fecha_ms', 'id_pac'] }
});
db.createIndex({
  index: { fields: ['usuario', 'rut'] }
});
// Dom7
var $$ = Dom7;
////////          ?????????????????            ///////////////
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
  // if (window.StatusBar) window.StatusBar.hide();
  //AndroidFullScreen.immersiveMode();
});
//////////////////////////
// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  statusbar: {
    enabled: false,
  },
  input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
    scrollIntoViewAlways: true
  },
  // App routes
  routes: routes,
});
//AndroidFullScreen.immersiveMode();
//app.statusbar.hide();
var mainView = app.views.create('.view-main', { /////////////////////// SOLO WEB
  url: '/'
});
app.on("init", function () { // Init/Create main view + Login 
  //alert(navigator.connection.type);
  var connection = navigator.connection.type.toString();
  //alert(connection);
  if (connection != "none") { //// hay internet
    //alert(connection);
    window.plugins.googleplus.trySilentLogin(
      {},
      function (obj) {
        localStorage.image = obj.imageUrl;
        localStorage.feedback = obj.displayName;
        document.querySelector("#image").src = obj.imageUrl;
        document.querySelector("#image").style.visibility = 'visible';
        //document.querySelector("#feedback").innerHTML = "Silent hi, " + obj.displayName + ", " + obj.email;
        document.querySelector("#feedback").innerHTML = obj.displayName;
        localStorage.setItem("usuario", obj.email);
        localStorage.nombre_fono = obj.displayName;
        console.log(obj);
        var mainView = app.views.create('.view-main', {
          url: '/'
        });
      },
      function (msg) { /// 2° callback llama a login original (entra aquí 1 vez abierto)
        window.plugins.googleplus.login(
          {},
          function (obj) {
            localStorage.setItem("image", obj.imageUrl);
            localStorage.setItem("feedback", obj.displayName);
            //localStorage.flag="1";
            document.querySelector("#image").src = obj.imageUrl;
            document.querySelector("#image").style.visibility = 'visible';
            // document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
            document.querySelector("#feedback").innerHTML = obj.displayName;
            localStorage.setItem("usuario", obj.email);
            localStorage.setItem("usuario_aux", obj.email);
            localStorage.setItem("nombre_fono", obj.displayName);
            localStorage.setItem("nombre_fono_aux", obj.displayName);
            var mainView = app.views.create('.view-main', {
              url: '/'
            });
          },
          function (msg) { //2°callback del 2°callback mensaje de error 
            alert(msg + "error");
          });
      }
    );
  } else {//no hay internet
    if (localStorage.feedback == "" || localStorage.feedback == null || localStorage.feedback === undefined) {
      app.dialog.alert("Verifique su conexión a internet", "Error");
      app.loginScreen.open("#my-login-screen");
    }
    else {
      localStorage.usuario = localStorage.usuario_aux;
      localStorage.nombre_fono = localStorage.nombre_fono_aux;
      var mainView = app.views.create('.view-main', {
        url: '/'
      });
    }
  }
});
function contacto() {
  app.panel.close();
  app.router.navigate("/contacto/");
}
$$(document).on('page:init', '.page[data-name="phaser"]', function (e) {
  console.log($$("#juego").val());
  if (juego_sel == "l1") {
    l1();
  }
  if (juego_sel == "l2") {
    l2();
  }
  if (juego_sel == "h1") {
    h1();
  }
  //l2();
}
);
$$(document).on('page:init', '.page[data-name="dinamicas"]', function (e) {
  $$(document).off("click", "[name='juego']").on("click", "[name='juego']", function () {
    //console.log($$(this));
    if ($$(this).attr("id") == "l1") {
      juego_sel = "l1";
      app.router.navigate("/phaser/");
    }
    if ($$(this).attr("id") == "l2") {
      juego_sel = "l2";
      app.router.navigate("/phaser/");
    }
  });
  //console.log($$("#juego").val());
  //l2();
}
);
$$(document).on('page:init', '.page[data-name="dinamicas_habla"]', function (e) {
  $$(document).off("click", "[name='juego']").on("click", "[name='juego']", function () {
    //console.log($$(this));
    if ($$(this).attr("id") == "h1") {
      juego_sel = "h1";
      app.router.navigate("/phaser/");
    }
    if ($$(this).attr("id") == "h2") {
      juego_sel = "h2";
      app.router.navigate("/phaser/");
    }
  });
  //console.log($$("#juego").val());
  //l2();
}
);
// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  //var username = $$('#my-login-screen [name="username"]').val();
  //var password = $$('#my-login-screen [name="password"]').val();
  // Close login screen
  app.loginScreen.close('#my-login-screen');
  // Alert username and password
  //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  document.querySelector("#image").src = localStorage.getItem("image");
  document.querySelector("#feedback").innerHTML = localStorage.getItem("feedback");
})
console.log("aaaaaa2323");
$$(document).on('page:init', '.page[data-name="form"]', function (e) {
  /////////////////////////////
  ////////////////////////////////
  /////////////////////////////
  ///////////////////////////////verificador rut paciente ////////////////////////
  $$('#rut').blur(function () {
    var rut1 = $$('#rut').val();
    rut = String(rut1);
    valor = rut;
    console.log(valor);
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();
    // Formatear RUN
    rut.value = cuerpo + '-' + dv
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * valor.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv || valor.substring(0, 1) == "0") {
      app.dialog.alert("RUT inválido", "");
      $$('input[name=rut]').val('');
      $$('input[name=rut]').focus();
      console.log("invalido");
      var flag = 1;
      return false;
    }
    else {
      console.log("valido");
    }
    if ($$("#rut").val() != "") {
      db.find({
        selector: {
          $and: [
            { rut: { $eq: $$("#rut").val() } },
            { usuario: { $eq: localStorage.usuario } }
          ]
        }
      }, function (err, result) {
        if (err) {
          return console.log(err);
        }
        else {
          console.log(result);
          if (result.docs.length != 0) {
            console.log(result);
            app.dialog.alert("El rut ya está registrado", "");
            $$('input[name=rut]').val('');
            $$('input[name=rut]').focus();
          }
        }
      });
    }
  });
  ///////////////////////// veri
  ///////////////////////////////verificador rut responsable ////////////////////////
  $$('#rut_res').blur(function () {
    var rut1 = $$('#rut_res').val();
    rut = String(rut1);
    valor = rut;
    console.log(valor);
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();
    // Formatear RUN
    rut.value = cuerpo + '-' + dv
    console.log(dv);
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * valor.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv || valor.substring(0, 1) == "0") {
      app.dialog.alert("RUT inválido", "");
      $$('input[name=rut_res]').val('');
      $$('input[name=rut_res]').focus();
      console.log("invalido");
      return false;
    }
    else {
      console.log("valido");
    }
  });
  ////////////// boton crear paciente ////////////////
  $$('#get').click(function () {
    console.log("click #get");
    if ($$('#form-nuevo-paciente')[0].checkValidity()) {
      console.log("aasd");
      var formData = app.form.convertToData('#form-nuevo-paciente');
      formData.usuario = localStorage.usuario;
      //formData.usuario="u1";
      //alert(JSON.stringify(formData));
      console.log(formData)
      var _id = $$('#rut_paciente').val();
      db.post((formData)); //inserta en la bdd local
      var nombre_apellido = $$('nombre_apellido').val();
      //var fecha_nac = $('#fecha_nac').val();
      var rut_res = $$('#rut_res').val();
      var nombre_apellido_res = $$('#nombre_apellido_res').val();
      var email = $$('#email').val();
      var telefono = $$('#telefono').val();
      var antecedentes_previos = $$('#antecedentes_previos').val();
      console.log("insertado pdb");
      console.log(formData._id, formData.nombre_apellido);
      app.dialog.alert("Paciente agregado", "");
      ////////////////////// php web host insert /////////////////
      var dataString = "id=" + formData._id + "$nombre=" + formData.nombre_apellido;
      //var dataString=formData;
      console.log(dataString);
      app.request({
        url: 'https://proaud.000webhostapp.com/recibir',
        //data:formData,
        //dataType:'json',
        data:
        {
          rut: formData.rut,
          nombre: formData.nombre_apellido,
          rut_res: formData.rut_res,
          nombre_res: formData.nombre_apellido_res,
          id_fono: localStorage.usuario,
          edad: formData.fecha_nac,
          telefono: formData.telefono,
          mail: formData.email,
          antecedentes: formData.antecedentes_previos,
        },
        method: "POST",
        //crossDomain: true,
        //cache:false,
        //_token: '{{csrf_token()}}'
        success: function () { console.log("succ") },
        error: function () { console.log("err") }
      });
      console.log("mysql");
      app.router.navigate("/");
    }
  });
});
$$(document).on('page:init', '.page[data-name="crudp"]', function (e) {
  //////////////// creacion tabla con datos pacientes ///////////////////////////////
  db.find({
    selector: {
      $and: [
        { rut: { $exists: true } },
        { usuario: { $eq: localStorage.usuario } }
      ]
    }
  }, function (err, result) {
    if (err) { return console.log(err); }
    else {
      //console.log (docs.rows);
      console.log("find");
      console.log(result);
      localStorage.setItem("arr_pac", JSON.stringify(result));
      var pacientes = JSON.parse(localStorage.arr_pac).docs;
      console.log(pacientes);
      console.log("find2");
      console.log(JSON.parse(localStorage.arr_pac).docs);
      var table = document.getElementById("tbody_crudp");
      var col = [];
      for (var i = 0; i < pacientes.length; i++) {
        for (var key in pacientes[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }
      for (var i = 0; i < col.length; i++) {
      }
      console.log(col);
      for (var i = 0; i < pacientes.length; i++) {
        tr = table.insertRow(-1);
        tr.className = "tr1";
        //tr.setAttribute("data-popup", "#poplink");
        var tabCell = tr.insertCell(-1);
        //tabCell.innerHTML = pacientes[i].doc[col[7]]+'    '+'<i class="icon material-icons md-only ">add_round</i>';
        tabCell.innerHTML = '<button class="col button button-raised" name="td1">' + pacientes[i][col[0]] + '</button>';
        tabCell.className = "td1 popover-open";
        tabCell.setAttribute("data-popover", "#poplink");
        for (var j = 1; j < col.length - 3; j++) {
          if (j = 1) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = pacientes[i][col[1]];
          }
          if (j = 4) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = pacientes[i][col[4]];
          }
          if (j = 7) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = pacientes[i][col[7]];
            // tabCell.setAttribute("style", "white-space:normal; word-wrap:break-word; ")
          }
          //console.log(col[j]);
          //tabCell.innerHTML = pacientes[i][col[j]];
        }
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML =
          '<td class="actions-cell">'
          + '<a class="link icon-only" name="edit">'
          + '<i class="icon f7-icons ios-only">compose</i>'
          + '<i class="icon material-icons md-only ">edit</i>'
          + '</a>'
          + '<a class="link icon-only" name="delete" >'
          + '<i class="icon f7-icons ios-only">trash</i>'
          + '<i class="icon material-icons md-only ">delete</i>'
          + '</a>'
          + '</td>';
        tabCell.className = "actions-cell";
        //tabCell.setAttribute("style","");
        //tabCell.setAttribute("width","10%");
      }
    }
    //////////////////// filtrar rut //////////////////////
    $$('#rut_filter').on('keyup', function () {
      rut = $$('#rut_filter').val();
      console.log(rut);
      var td;
      var tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(rut) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
    //////////////////// borrar paciente ///////////////////////
    $$("[name='delete']").on('click', function () {
      var $row = $$(this).closest("tr");    // Find the row
      var $text = $row.find(".td1").text(); // Find the text
      // Outputs the answer
      console.log($text);
      //// fetch doc and delete ////
      db.find({
        selector: {
          $and: [
            { rut: { $eq: $text } },
            { usuario: { $eq: localStorage.usuario } }
          ]
        }
      }, function (err, result) {
        if (err) { return console.log(err); }
        else {
          console.log(result);
          db.remove(result.docs[0]._id, result.docs[0]._rev, function (err, response) {
            if (err) { return console.log(err); }
            $row.remove().draw();
          });
        }
      });
      /*db.get($text, function(err, doc) {
        if (err) {
           return console.log(err);
        } else {
           console.log(doc);
           db.remove(doc._id, doc._rev, function(err, response) {
            if (err) { return console.log(err); }
            $row.remove().draw();
          });
        }
      });*/
    });
    //////// editar paciente -> fetch doc ////////////////
    $$("[name='edit']").on('click', function () {
      var $row = $$(this).closest("tr");    // Find the row
      var $text = $row.find(".td1").text(); // Find the text
      // Outputs the answer
      console.log($text);
      //// fetch doc  ////
      /*db.get($text, function(err, doc) {
        if (err) {
           return console.log(err);
        } else {
           console.log(doc);
           localStorage.setItem('paciente', JSON.stringify(doc));
           app.router.navigate("/editarp/");
        
        }
      });*/
      db.find({
        selector: {
          $and: [
            { rut: { $eq: $text } },
            { usuario: { $eq: localStorage.usuario } }
          ]
        }
      }, function (err, result) {
        if (err) { return console.log(err); }
        else {
          console.log(result);
          localStorage.setItem('paciente', JSON.stringify(result.docs[0]));
          app.router.navigate("/editarp/");
        }
      });
    });
    ////////// seleccionar paciente para sesiones //////////////////////
    $$('[name="td1"]').on('click', function (e) {
      localStorage.setItem("pac_sel", $$(this).text());
      console.log(localStorage.pac_sel);
    });
    //document.getElementById("nueva_sesion").addEventListener("click", function(){
    //$$(document).once('click','[name="nueva_sesion"]', function(){
    $$('[name="nueva_sesion"]').off('click').on('click', function (e) {
      console.log("nueva sesion click");
      localStorage.id_ses = null;
      sesion(localStorage.pac_sel);
      return false;
    });
  });
});
//////// guardar dinamica en bd ///////////
$$(document).on('page:init', '.page[data-name="score"]', function (e) {
  $$('[name="bk_sesion"], [name="select_din"]').off('click').on('click', function () {
    //$$(document).off('click').once("click", '[name="repetir_din"], [name="bk_sesion"], [name="select_din"]', function () {
    console.log("hola2");
    db.post({
      tipo: "dinamica",
      id_ses: localStorage.id_ses,
      tiempo: (Math.round(localStorage.tiempo * 10) / 10),
      obs: $$("#obs_score").val(),
      nom_dinamica: localStorage.dinamica,
      resultado: $$("#result_din").val(), /// agregar resultado x de dinamica
      fecha: new Date().getTime()
    }, function (err, response) {
      if (err) { return console.log(err); }
      // handle response
    });
    //////////////
    ///////////////
    app.request({
      url: 'https://proaud.000webhostapp.com/recibir',
      //data:formData,
      //dataType:'json',
      data:
      {
        rut_paciente: localStorage.pac_sel,
        //sesion_id:localStorage.id_ses,
        tipo: tipo_dinamica,
        nom_dinamica: localStorage.dinamica,
        resultado: $$("#result_din").val(),
        tiempo: (Math.round(localStorage.tiempo * 10) / 10),
      },
      method: "POST",
      //crossDomain: true,
      //cache:false,
      //_token: '{{csrf_token()}}'
      success: function () { console.log("succ") },
      error: function () { console.log("err") }
    });
  });
});
//////////// editar paciente //////////////
$$(document).on('page:init', '.page[data-name="editarp"]', function (e) {
  var paciente = localStorage.getItem('paciente');
  console.log('retrievedObject: ', JSON.parse(paciente));
  paciente = JSON.parse(paciente);
  //console.log("->"+paciente.docs[0]);
  //console.log(paciente.docs[0].rut);
  $$("[name=rut]").val(paciente.rut);
  $$("[name=nombre_apellido]").val(paciente.nombre_apellido);
  $$("[name=fecha_nac]").val(paciente.fecha_nac);
  $$("[name=rut_res]").val(paciente.rut_res);
  $$("[name=nombre_apellido_res]").val(paciente.nombre_apellido_res);
  $$("[name=email]").val(paciente.email);
  $$("[name=telefono]").val(paciente.telefono);
  $$("[name=antecedentes_previos]").val(paciente.antecedentes_previos);
  ///////////// verificar rut responsable editp ///////////////////
  $$('#rut_res').blur(function () {
    var rut1 = $$('#rut_res').val();
    rut = String(rut1);
    valor = rut;
    console.log(valor);
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();
    rut.value = cuerpo + '-' + dv
    console.log(dv);
    suma = 0;
    multiplo = 2;
    for (i = 1; i <= cuerpo.length; i++) {
      index = multiplo * valor.charAt(cuerpo.length - i);
      suma = suma + index;
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    dvEsperado = 11 - (suma % 11);
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    if (dvEsperado != dv || valor.substring(0, 1) == "0") {
      app.dialog.alert("RUT inválido", "");
      $$('input[name=rut_res]').val('');
      $$('input[name=rut_res]').focus();
      console.log("invalido");
      return false;
    }
    else {
      console.log("valido");
    }
  });
  //////////////// boton guardar cambios editar paciente //////////////////////////
  $$('#update_p').click(function () {
    if ($$('#form-editar-paciente')[0].checkValidity()) {
      var formData = app.form.convertToData('#form-editar-paciente');
      console.log("data:");
      console.log(formData);
      //alert(JSON.stringify(formData));
      var _id = $$('#rut').val();
      //formData._id=_id.val();
      //$$(formData._id).val(_id);
      db.find({
        selector: {
          $and: [
            { rut: { $eq: formData.rut } },
            { usuario: { $eq: localStorage.usuario } }
          ]
        }
      }, function (err, result) {
        if (err) { return console.log(err); }
        console.log("---->" + result);
        console.log(result);
        console.log(result.docs[0]._id);
        db.put({
          _id: result.docs[0]._id,
          _rev: result.docs[0]._rev,
          rut: formData.rut,
          nombre_apellido: formData.nombre_apellido,
          fecha_nac: formData.fecha_nac,
          rut_res: formData.rut_res,
          nombre_apellido_res: formData.nombre_apellido_res,
          email: formData.email,
          telefono: formData.telefono,
          antecedentes_previos: formData.antecedentes_previos,
          usuario: result.docs[0].usuario,
        }, function (err, response) {
          if (err) { return console.log(err); }
          // handle response
        });
      });
      /*db.get(formData._id, function(err, doc) {
        if (err) { return console.log(err); }
        // handle doc
        db.put({
          nombre_apellido:formData.nombre_apellido,
          fecha_nac:formData.fecha_nac,
          rut_res:formData.rut_res,
          nombre_apellido_res:formData.nombre_apellido_res,
          email:formData.email,
          telefono:formData.telefono,
          antecedentes_previos:formData.antecedentes_previos,
          _id: formData._id,
          _rev: doc._rev,
          
        }, function(err, response) {
          if (err) { return console.log(err); }
          // handle response
        });
      });*/
      /*var nombre_apellido = $$('nombre_apellido').val();
      //var fecha_nac = $('#fecha_nac').val();
      var rut_res = $$('#rut_res').val();
      var nombre_apellido_res = $$('#nombre_apellido_res').val();
      var email = $$('#email').val();
      var telefono = $$('#telefono').val();
      var antecedentes_previos = $$('#antecedentes_previos').val();*/
      //console.log("insertado pdb");
      //console.log(formData._id,formData.nombre_apellido);
      app.router.navigate("/crudp/", { reloadPrevius: true, ignoreCache: true });
    }
  });
});
///////////////////// fin crudp ////////
////////////// tabla dinamicas realizadas por sesion ////////////////
$$(document).on('page:init', '.page[data-name="sesion"]', function (e) {
  db.get(localStorage.id_ses, function (err, doc) {
    if (err) { return console.log(err); }
    $$("#obs_sesion").val(doc.obs);
  });
  db.find({
    selector: {
      id_ses: localStorage.id_ses
    }
  }, function (err, result) {
    if (err) { return console.log(err); }
    console.log("dinamica:");
    console.log(result);
  });
  tb_din(localStorage.id_ses, false); //tabla dinamica con dinámicas
  $$('#obs_sesion').blur(function () { // autoguardado de observaciones
    console.log("blur");
    db.get(localStorage.id_ses, function (err, doc) {
      if (err) { return console.log(err); }
      db.put({
        tipo: "sesion",
        id_pac: doc.id_pac,
        fecha: doc.fecha,
        obs: $$("#obs_sesion").val(),
        fecha_ms: doc.fecha_ms,
        pendiente: doc.pendiente,
        //pendiente: localStorage.pendiente,
        _id: localStorage.getItem("id_ses"),
        _rev: doc._rev,
      }, function (err, response) {
        if (err) { return console.log(err); }
        // handle response
      });
    });
  });
});
$$(document).on('page:init', '.page[data-name="crud_ses"]', function (e) {
  suma = 0;
  tb_ses(localStorage.pac_sel);
  //$$("[name='delete_ses']").off('click').on('click', function (e) {
  $$(document).off("click", "[name='delete_ses']").on("click", "[name='delete_ses']", function () { ///// borrar sesion
    //console.log("123");
    var $row = $$(this).closest("tr");    // Find the row
    var $text = $row.find("[name='btn_ver_ses']").attr("id"); // Find the text
    console.log($text);
    db.get($text, function (err, doc) {
      if (err) { return console.log(err); }
      db.remove(doc, function (err, response) {
        if (err) { return console.log(err); }
        console.log("sesion borrada");
        $row.remove().draw();
      });
    });
  });
  //rendimiento();
  $$(document).on("click", "[name='btn_ver_ses']", function () {
    // $$('#btn_ver_ses').off('click').on('click', function (e) {
    sesion_sel = this.getAttribute("id");
    console.log(sesion_sel);
    sesion_obs = this.getAttribute("data-obs-ses");
    //$$("#card_obs_ses").text();
    //localStorage.id_ses=null;
    //sesion(localStorage.pac_sel);
    //return false;
  });
});
$$(document).on('page:init', '.page[data-name="ver_sesion"]', function (e) {
  //ver_sesion();
  $$("#card_obs_ses").text(sesion_obs);
  tb_din(sesion_sel, true);
});
$$(document).on('page:init', '.page[data-name="contacto"]', function (e) {
  // console.log($$("#mensaje").val());
  $$(document).off("click", "[name='enviar_msj']").on("click", "[name='enviar_msj']", function (e) {
    if ($$("#mensaje").val() != "") {
      //$$("[name='enviar_msj']").off("click");
      app.request({
        url: 'https://proaud.000webhostapp.com/recibir',
        //data:formData,
        //dataType:'json',
        data:
        {
          fono_mail: localStorage.usuario,
          nombre_fono: localStorage.nombre_fono,
          feedback: $$("#mensaje").val()
        },
        method: "POST",
        //crossDomain: true,
        //cache:false,
        //_token: '{{csrf_token()}}'
        success: function () {
          console.log("succ");
          app.dialog.alert("Mensaje enviado!", "");
          app.router.navigate("/");
        },
        error: function () {
          app.dialog.alert("): Comprueba tu conexión a Internet o intenta más tarde", "");
          console.log("err")
        }
      });
    } else {
      app.dialog.alert("Por el momento no aceptamos mensajes vacios ):", "");
    }
  });
});