

  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAUbxmM2KBuy5opW7Dlejd3v-EkBu2devk",
        authDomain: "bbbe-5b6fb.firebaseapp.com",
        databaseURL: "https://bbbe-5b6fb.firebaseio.com",
        projectId: "bbbe-5b6fb",
        storageBucket: "bbbe-5b6fb.appspot.com",
        messagingSenderId: "291653738479"
    };
        firebase.initializeApp(config);

var bd = firebase.database();/* Esta es la referencia hacia la base de datos*/
var tabla = bd.ref("Clientes");/* a la tabla de los clientes*/
var productos = bd.ref("Productos"); //tabla productos
var empleados = bd.ref("Empleados");
var empleadoID;
var n = 0; /*variable auxiliar es un contador para no pasarse de 15 productos*/
var sel = document.getElementById("cliente"); /*se toma el selector llamado cliente y se guarda en sel*/
var total = 0.0; /* variable para los totales*/

tabla.once("value", function (snap) { /*toda esta porcion es para cargar los datos del documento cliente en el select*/
    var array = snap.val();
    for (var dato in array) {
        sel.innerHTML += " <option value='" + dato + "' >" + array[dato].name + " " + array[dato].ape + " </option>";
    }
});
/* lo mismo de arriba pero para productos */
productos.once("value", function (snap) {
    var array = snap.val();
    for (var dato in array) {
        var sel1 = document.getElementById("producto");
        sel1.innerHTML += " <option value='" + dato + "' >" + array[dato].Nombre + " " + array[dato].descripcion + " </option>";

    }
});

empleados.once("value", function (snap) {
    var array = snap.val();
    for (var dato in array) {
        var sel1 = document.getElementById("empleado");
        sel1.innerHTML += " <option value='" + dato + "' >" + array[dato].id + " " + array[dato].name + " </option>";

    }
});
/*<script<scriptESTO ES PARA EL BOTON DE AGREGAR!!!!*/
function alertas() {
    var aletas = document.getElementById("alerta");
    alertas.innerHTML = "<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>" + "&times;" + "</button>" +
        "<strong>" + "Danger!" + "</strong>" + "This alert box could indicate a dangerous or potentially negative action." +
        "</div>";

}
function agregar1() {

    var agregar = document.getElementById("producto").value; /* se toma el id del boton agregar*/
    var cant = document.getElementById("cant").value; /*se toma el id del campo cantidad */

    if (agregar == "Seleccione un producto o servicio") { /* la condicion mientras el select sea igual a eso mandare el mensaje*/
        alert("Selecione un producto o servicio");
    } else if (cant <= 0) {
        alertas();
        alert("La cantidad minima es 1");
    } else {/*si todo lo demas no se cumple iniciamos a ingresar los tr*/
        var db = firebase.database(); /*volvemos a llamar a la base de datos es redundante pero falta crear variables globales y ahorita funciona asi que no lo quiero tocar*/
        console.log(agregar); /*mensaje para ver el valor del documento que devuelve */
        var dato = db.ref("Productos").child(agregar); /* aqui lo que hacemos es seleccionar de firebase el id por decirlo asi que contiene agregar*/

        if (n == 15) {

            alert("Ya ha alcanzado el maximo de productos permitidos")
        } else {/* condicional para que no se pasen de 15 productos */
            dato.once("value", function (snap) { /* hace una captura de lo que hay en el documento con el id que le pasamos*/
                var array = snap.val(); /*creamos la variable array iguala al valor que contiene todo el documento devuelto*/

                //for(var dat in array){
                var tol = document.getElementById("total"); /*esto es para ir actualizando el total*/
                var sel2 = document.getElementById("tabla");/*El id de la tabla que modificare*/
                var row = sel2.insertRow(index = -1); /*bien aqui esta lo bueno esta onda lo que hace es insertar fila por fila en una despues de la otra para eso el -1*/
                var cell1 = row.insertCell(0);/* con insert cel se inserta una celda especifica en un posicion especifica que se le pasa como valor*/
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);


                cell1.innerHTML = cant; /*Se imprime en el documento con inner en cada celda respectiva*/
                cell2.innerHTML = array.Nombre + " " + array.descripcion;
                cell3.innerHTML = "$ " + array.precio;
                cell4.innerHTML = array.precio * cant;
                cell5.innerHTML = "<input type='checkbox' name = 'del'/>"; /* este es el check para eliminar mas adelante*/
                n = n + 1;
                total = total + array.precio * cant; /*el contador para que vaya sumando las cantidades segun se van agregando productos*/
                console.log(total);
                tol.innerHTML = "<label>" + "$ " + total + "</label>"; /*aqui lo va imprimieno en el label*/

            });
        }
    }
}

function pdf() {

    /*solo sirve para imprimir el pdf esta es una libreria a parte */
    HTMLtoPDF();
}

function empleado1() {
    var empleado1 = document.getElementById("empleado").value;
    var db = firebase.database();
    var dato = db.ref("Empleados").child(empleado1);
    console.log(empleado);
    dato.once("value", function (snap) { /* volvemos hacer la captura de los datos*/
        var array = snap.val();
        //var sel2 = document.getElementById("info"); /* aqui selecciona la tabla en la que se va insertar el cliente*/
        empleadoID = array.id + " " + array.name;
    });

}

function cliente12() { /*Bien cliente12 su funcion es agregar el cliente selecionado */

    var agregar = document.getElementById("cliente").value; /*tomamos el valor de su select*/
    var db = firebase.database(); /*denuevo la referencia a la base de datos*/

    console.log(agregar);
    var dato = db.ref("Clientes").child(agregar); /*al documento*/

    dato.once("value", function (snap) { /* volvemos hacer la captura de los datos*/
        var array = snap.val();
        var f = new Date(); /* esto es para la fecha */
        var sel2 = document.getElementById("info"); /* aqui selecciona la tabla en la que se va insertar el cliente*/


        var fecha = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());/*todo esto es para fecha*/
        sel2.innerHTML =
            "<tr>" +
            "<td class='col-md-auto'>" + "Empleado: " + empleadoID + "</td>" +
            "<td class='col-md-auto'>" + "Cotizaciones" + "</td>" +
            "</tr>" +
            "<tr>" + /*Inicamos a imprimir en el documento */
            //"<td style='width:45px'>""</td>"+

            "<td class='col-md-auto'>" + "Cliente:  " + array.name + " " + array.ape + "</td>" + // con el col-md hacmeos que queden automaticas asi no se descofiguaran todas
            //"<td style='width:45px'>"+"Fecha:"+"</td>"+
            "<td class='col-md-auto'>" + "Fecha:  " + fecha + "</td>" +//se concatena la fecha
            // "<td>"+""+"</td>"+
            "</tr>";

    });

}
function restar() {
    /*toda esta funcion sirve para restar cada que se elimana un valor esto es jquery*/
    var total1 = 0;
    var tol = document.getElementById("total");
    //De esta manera utilizando eq seleccionamos la segunda fila, ya que la primera es 0
    $("#tabla tr").find('td:eq(3)').each(function () {

        //obtenemos el valor de la celda
        valor = $(this).html();

        //sumamos, recordar parsear, si no se concatenara.
        total1 += parseInt(valor)
    })

    //mostramos el total
    tol.innerHTML = "<label>" + "$ " + total1 + "</label>";
    //alert(total1)
}
/*Con esta funcion se eliminan uan fila que sea selecionada*/
function borrar() {
    tab = document.getElementById('tabla');

    for (i = tab.getElementsByTagName('input').length - 1; i >= 0; i--) { //este for lo uqe hace es recorrer todas las filas 
        chk = tab.getElementsByTagName('input')[i];
        if (chk.checked) { /*si el chek esta chekeado elimina esa fila*/
            tab.removeChild(chk.parentNode.parentNode);
            restar();/*llamamos a restar para que tambien se reste el valor de esa fila*/
        }

    }

}
    
function logout(){
    
    firebase.auth().signOut().then(function() {
        var url="login.html";
            document.location.target = "_blank";
            document.location.href=url;
      }).catch(function(error) {
        console.log(error);
      });
}
                             