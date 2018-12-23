function sesion(pac_sel) {
  console.log("hola:" + pac_sel);
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var output = d.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;
  db.post({ ////crear nueva sesion
    tipo: "sesion",
    id_pac: pac_sel,
    fecha: output,
    obs: "",
    fecha_ms: new Date().getTime(),
    pendiente: ""
  }, function (err, response) {
    if (err) { return console.log(err); }
    var id_ses = response.id;
    localStorage.setItem("id_ses", response.id);
    console.log("id___:" + id_ses);
    console.log(response);
    db.get(response.id, function (err, doc) {
      if (err) { return console.log(err); }
      if (doc.obs != null) {
        $$("#obs_sesion").val(doc.obs);
      }
    })
  });
  app.request({
    url: 'https://proaud.000webhostapp.com/recibir',
    //data:formData,
    //dataType:'json',
    data:
    {
      paciente_id: pac_sel,
      tipo: "sesion",
      obs: "",
      //id_fono:localStorage.usuario
    },
    method: "POST",
    //crossDomain: true,
    //cache:false,
    //_token: '{{csrf_token()}}'
    success: function () { console.log("succ") },
    error: function () { console.log("err") }
  });
  console.log(new Date().getTime() - localStorage.time_location + "tiempo");
  if (localStorage.time_location == "undefined") {
    localStorage.time_location = new Date().getTime()
  };
  console.log(new Date().getTime() - localStorage.time_location + "tiempo2");
  if ((new Date().getTime() - localStorage.time_location) >= (604800000) || (new Date().getTime() - localStorage.time_location) <= (100)) {
    var onSuccess = function (position) {
      /*alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp1: '         + position.timestamp                + '\n');*/
      app.request({
        url: 'https://proaud.000webhostapp.com/recibir',
        //data:formData,
        //dataType:'json',
        data:
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          id_fono: localStorage.usuario,
          fecha_ms: new Date().getTime()
          //id_fono:localStorage.usuario
        },
        method: "POST",
        //crossDomain: true,
        //cache:false,
        //_token: '{{csrf_token()}}'
        success: function () {
          console.log("succ")
          localStorage.time_location = new Date().getTime();
        },
        error: function () { console.log("err") }
      });
    };
    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    /////////////////////////////////
  }
  console.log(localStorage.time_location);
  return false;
}
function tb_din(id_ses, ver_ses) {
  db.find({
    selector: {
      $and: [
        { fecha: { $gt: null } },
        { id_ses: { $gt: null } },
        { id_ses: { $eq: id_ses } }
      ]
    },
    sort: [{ 'fecha': 'desc' }]
  }, function (err, result) {
    if (err) { return console.log(err); }
    else {
      console.log("find");
      console.log(result);
      localStorage.setItem("arr_din", JSON.stringify(result));
      var dinamicas = JSON.parse(localStorage.arr_din).docs;
      console.log(dinamicas);
      console.log("find2");
      console.log(JSON.parse(localStorage.arr_din).docs);
      var table = document.getElementById("tbody_din");
      var col = [];
      var results = [];
      //results[0]="Progreso evaluación";
      for (var i = 0; i < dinamicas.length; i++) {
        for (var key in dinamicas[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }
      //console.log(col);
      for (var i = 0; i < dinamicas.length; i++) {
        tr = table.insertRow(-1);
        tr.className = "tr1";
        results[i] = dinamicas[i][col[5]];
        for (var j = 0; j < col.length; j++) {
          console.log(col[j]);
          if (j == 0) { var tabCell = tr.insertCell(-1); tabCell.innerHTML = dinamicas[i][col[4]]; }
          if (j == 1) { var tabCell = tr.insertCell(-1); tabCell.innerHTML = dinamicas[i][col[3]]; }
          if (j == 2) { var tabCell = tr.insertCell(-1); tabCell.innerHTML = dinamicas[i][col[2]]; }
          if (j == 3) { var tabCell = tr.insertCell(-1); tabCell.innerHTML = dinamicas[i][col[5]]; }
        }
        /*if(ver_ses==false){
        var tabCell=tr.insertCell(-1);
        tabCell.innerHTML= 
        '<td class="actions-cell">'
        +'<a class="link icon-only" name="delete_din" >'
          +'<i class="icon f7-icons ios-only">trash</i>'
          +'<i class="icon material-icons md-only ">delete</i>'
       +'</a>'
      +'</td>';
      tabCell.className="actions-cell"; 
        }   */
      }
      //console.log(results+"antes");
      if (results.length >= 1) {
        //results[results.length]="Progreso durante la sesión";
        //console.log(results+"despues");
        /*var chart_res_din = c3.generate({
          bindto: '#chart',
          size: {
            height: 240
            
        },
          data: {
              columns: [
                //results.reverse()
                results
              ],
              labels: true  
              
          },
          axis: {
            x: {
                label: 'Dinámicas realizadas'
            },
            y: {
                label: 'Puntaje asignado'
            }
        }
        });*/
        /// chartjs
        var ctx = document.getElementById("myChart").getContext('2d');
        //ctx.height=200;
        //console.log(results);
        var cantidad = [];
        for (i = 0; i < results.length; i++) {
          cantidad.push(i + 1);
          //console.log(cantidad);
        }
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cantidad,
            datasets: [{
              label: 'Progreso de la sesión',
              data: results.map(Number).reverse(),
              borderWidth: 3,
              fill: false,
              borderColor: "#007aff"
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 100,
                  stepSize: 10
                },
                gridLines: {
                  display: false
                },
                scaleLabel: {
                  display: true,
                  labelString: "Puntaje"
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                },
                scaleLabel: {
                  display: true,
                  labelString: "Dinámicas realizadas"
                }
              }]
            },
            trendlineLinear: {
              style: "#ff9500",
              width: 2
            },
            maintainAspectRatio: false,
          }
        });
        myChart.canvas.parentNode.style.height = '300px';
        db.get(localStorage.id_ses, function (err, doc) {
          if (err) { return console.log(err); }
          db.put({
            tipo: "sesion",
            id_pac: doc.id_pac,
            fecha: doc.fecha,
            obs: doc.obs,
            fecha_ms: doc.fecha_ms,
            pendiente: localStorage.pendiente,
            //_id: localStorage.getItem("id_ses"),
            _id: id_ses,
            _rev: doc._rev,
          }, function (err, response) {
            if (err) { return console.log(err); }
            // handle response
          });
        });
      }// fin if -> resultados <1
      // fin chart js
      //console.log(results);
    }
  });
}
function tb_ses(id_pac) {
  db.find({
    selector: {
      $and: [
        { fecha_ms: { $gt: null } },
        { id_pac: { $gt: null } },
        { id_pac: { $eq: id_pac } }
      ]
    },
    sort: [{ 'fecha_ms': 'desc' }]
  }, function (err, result) {
    if (err) { return console.log(err); }
    else {
      console.log("find");
      console.log(result);
      localStorage.setItem("arr_ses", JSON.stringify(result));
      var sesiones = JSON.parse(localStorage.arr_ses).docs;
      console.log(sesiones);
      console.log("find2");
      console.log(JSON.parse(localStorage.arr_din).docs);
      var table = document.getElementById("tbody_ses");
      var largo = sesiones.length;
      var col = [];
      for (var i = 0; i < sesiones.length; i++) {
        for (var key in sesiones[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }
      //console.log(col);
      for (var i = 0; i < sesiones.length; i++) {
        if (sesiones[i][col[5]] == "nulo") {
          largo = largo - 1;
        }
      }
      for (var i = 0; i < sesiones.length; i++) {
        if (sesiones[i][col[5]] != "nulo") {
          suma = suma + parseFloat(sesiones[i][col[5]]);
          console.log("pendiente->" + parseFloat(sesiones[i][col[5]]));
          console.log("posicion pend->" + parseFloat(sesiones[i][col[5]]));
          localStorage.rendimiento = suma / largo;
          console.log("suma->" + suma);
          console.log("rendimiento->" + localStorage.rendimiento);
        }/*else{
        suma=suma+parseInt(localStorage.rendimiento);
        console.log("pendiente->"+parseFloat(sesiones[i][col[5]]));
        console.log("posicion pend->"+parseFloat(sesiones[i][col[5]]));
        localStorage.rendimiento=suma/sesiones.length;
        console.log("suma->"+suma); 
        console.log("rendimiento->"+localStorage.rendimiento); 
      }*/
        tr = table.insertRow(-1);
        tr.className = "tr1";
        //console.log(suma); 
        for (var j = 0; j < col.length; j++) {
          //console.log(col[j]);
          //console.log(suma);
          if (j == 0) {
            var tabCell = tr.insertCell(-1); tabCell.innerHTML = '<a href="/ver_sesion/" id="' + sesiones[i][col[6]] + '" data-obs-ses="' + sesiones[i][col[3]] + '" name="btn_ver_ses" style="display:block;padding-left:2vh;" class="tab-link ripple"><i class="icon material-icons md-only size-50 color-blue">add_circle</i>&emsp;' + sesiones[i][col[2]] + '</a>';
          }
          if (j == 1) {
            //largo=sesiones[i][col[3]].length;
            // console.log(largo);
            //console.log(sesiones[i][col[3]].length);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = sesiones[i][col[3]];
          }
          //if(j==2){var tabCell = tr.insertCell(-1);tabCell.innerHTML = sesiones[i][col[2]];}
          // if(j==3){var tabCell = tr.insertCell(-1);tabCell.innerHTML = sesiones[i][col[5]];}
        }
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML =
          '<td class="actions-cell">'
          + '<a class="link icon-only" name="delete_ses" >'
          + '<i class="icon f7-icons ios-only">trash</i>'
          + '<i class="icon material-icons md-only ">delete</i>'
          + '</a>'
          + '</td>';
        tabCell.className = "actions-cell";
      }
      rendimiento(((parseFloat(localStorage.rendimiento) + 1) / 2) * 100);
    }
  });
}
function guardar_obs(id_ses) {
  $$(document).on("blur", "#obs_sesion", function () {
    console.log("blur");
    db.get(id_ses, function (err, doc) {
      if (err) { return console.log(err); }
      db.put({
        _id: id_ses,
        _rev: doc._rev,
        obs: this
      }, function (err, response) {
        if (err) { return console.log(err); }
        // handle response
      });
    });
  });
}
function rendimiento(valor) {
  var opts = {
    angle: -0.2, // The span of the gauge arc
    lineWidth: 0.3, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.49, // // Relative to gauge radius
      strokeWidth: 0.06, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticZones: [
      { strokeStyle: "#F03E3E", min: 0, max: 25 }, // Red from 100 to 130
      { strokeStyle: "#FFDD00", min: 25, max: 50 }, // Yellow
      { strokeStyle: "#30B32D", min: 50, max: 100 }, // Green
    ],
    staticLabels: {
      font: "12px sans-serif",  // Specifies font
      labels: [13, 38, 75],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
  };
  var target = document.getElementById('gauge'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 10; // set animation speed (32 is default value)
  gauge.set(valor); // set actual value
  //gauge.percentColors = [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]];
}
