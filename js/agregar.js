
window.onload = inicializarPagina;

var config = {
    apiKey: "AIzaSyAUbxmM2KBuy5opW7Dlejd3v-EkBu2devk",
    authDomain: "bbbe-5b6fb.firebaseapp.com",
    databaseURL: "https://bbbe-5b6fb.firebaseio.com",
    projectId: "bbbe-5b6fb",
    storageBucket: "bbbe-5b6fb.appspot.com",
    messagingSenderId: "291653738479"
};
    firebase.initializeApp(config);

/* Variables globales */
var formularioDatos;
var refEmpleados;
var ref_idEmpleado2;
var idEmpleado2;
var CREATE = "Agregar Empleado";
var UPDATE = "Actualizar Empleado";
var CAMBIO = CREATE;
var btnUpdate;

function inicializarPagina(){
    /*formularioDatos = document.getElementById('formDatos');
    formularioDatos.addEventListener("submit", enviarDatos, false);*/
    
    console.log("iniciando");

    tablaMostrar = document.getElementById("tablaEmpleados");
    refEmpleados = firebase.database().ref().child("Empleados");
    //console.log(CAMBIO);
    mostrarTabla();
}    
/* Esta funcion recibe los id de cada campo sirve como un acotador para evitar escribir el document*/
function getID(id){
    return document.getElementById(id).value;
}
/* Esta funcion crea un arreglo que guardara los datos de la variables */
function arrayEmpleado(id,name,ape,cargo,dui){
    var data = {id: id,name: name,ape: ape,cargo: cargo,dui: dui};
    return data;
}

/* Esta funcion insertara un nuevo empleado */
function ocultar(){
   
}

function ocultar1(){
    
}
function insertEmpleado(){
    
    /* Declaracion de las variables que reciben los value de los campos */
    var id = getID("codEmpleado");
    var name = getID("nomEmpleado");
    var ape = getID("apeEmpleado");
    var cargo = getID("cargo");
    var dui = getID("duiEmpleado");
    console.log(name + " " + ape);
    
    
    
    if(id.length==0 || name.length == 0 || ape.length == 0 || cargo.length == 0 || dui.length == 0){
        alert("Campos vacios "+id+name+ape+cargo+dui);
        
    }else{
        
        var arrayData = arrayEmpleado(id,name,ape,cargo,dui);
        console.log(arrayData);
        var newEmpleado = firebase.database().ref("Empleados");
        newEmpleado.push(arrayData);
        alert("Guardado En la Base");
        console.log("save");

        limpiar();
        comprobar();
    }
    
}

function limpiar(){
    document.getElementById("codEmpleado").value = "";
    document.getElementById("nomEmpleado").value = "";
    document.getElementById("apeEmpleado").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("duiEmpleado").value = "";
}

function updateEmpleado(){
    
    var id = getID("codEmpleado");
    var name = getID("nomEmpleado");
    var ape = getID("apeEmpleado");
    var cargo = getID("cargo");
    var dui = getID("duiEmpleado");
    console.log(name + " " + ape);

    if(id.length==0 || name.length == 0 || ape.length == 0 || cargo.length == 0 || dui.length == 0){
        alert("Campos vacios");
    }else{
        
        var arrayData = arrayEmpleado(id,name,ape,cargo,dui);
        console.log(arrayData);
        var newEmpleado = firebase.database().ref("Empleados").child(idEmpleado2);
        newEmpleado.update(arrayData);
        alert("!! El dato ha sido Actualizado !!");
        //console.log("save");
        limpiar();
    }
   
}

function comprobar(){
    
    var aux = 0;
    refEmpleados.on("value", function(snap){
    var datos = snap.val();
    var filaDocumento1;
    
        for(var documento1 in datos){
            filaDocumento1 =  datos[documento1].id;
        }
        aux = parseFloat(filaDocumento1);
       // console.log(aux);
        aux = aux + 1;
        var id1 = String(aux);
        console.log(aux);
        document.getElementById("codEmpleado").value = id1;
        //document.getElementById("nomEmpleado").value = aux;
        //alert(id);
        //getID("codEmpleado").value = aux;
       // console.log(aux);
    });
}

function mostrarTabla(){
    
    refEmpleados.on("value", function(snap) {
    var datosArray = snap.val();
    var filaDocumento = "";
    var n=1;
        
    for(var documento in datosArray){
        filaDocumento += "<tr>" +
                            "<td>"+ n +"</td>"+
                            "<td>"+ datosArray[documento].id +"</td>"+
                            "<td>"+ datosArray[documento].name +"</td>"+
                            "<td>"+ datosArray[documento].ape +"</td>"+
                            "<td>"+ datosArray[documento].cargo +"</td>"+
                            "<td>"+ datosArray[documento].dui +"</td>"+
                            '<td>'+
                                '<button class="btn btn-danger borrarEmpleado" dataEmpleado = "'+documento+'">'+
                                  '<span class="fa fa-trash" aria-hidden="true"></span>'+
                                '</button>'+
                                '<button class="btn btn-info editarEmpleado " data-toggle="modal" data-target="#exampleModal" dataEmpleado2 = "'+documento+'" >'+
                                  '<span class="fa fa-edit" aria-hidden="true"></span>'+
                                '</button>'+
                             '</td>'+
                         "</tr>";
                         n=n+1;
        }
      
        tablaMostrar.innerHTML = filaDocumento;
        if(filaDocumento !== ""){
        
        var documentosEditar = document.getElementsByClassName('editarEmpleado');
        for (var i = 0; i < documentosEditar.length; i++) {
          documentosEditar[i].addEventListener("click",editarEmpleado,false);
        }
        var documentosBorrar = document.getElementsByClassName('borrarEmpleado');
        for (var i = 0; i < documentosBorrar.length; i++) {
          documentosBorrar[i].addEventListener("click",borrarEmpleado,false);
        }
      }
    });
  }

function borrarEmpleado() {
    var idEmpleado = this.getAttribute("dataEmpleado");
    var ref_idEmpleado = refEmpleados.child(idEmpleado);
    ref_idEmpleado.remove();
}

function editarEmpleado() {

    idEmpleado2 = this.getAttribute("dataEmpleado2");
    ref_idEmpleado2 = refEmpleados.child(idEmpleado2);
 

    ref_idEmpleado2.once("value",function(snap) {
    var datosSnap = snap.val();
    
    document.getElementById("codEmpleado").value = datosSnap.id;
    document.getElementById("nomEmpleado").value = datosSnap.name;
    document.getElementById("apeEmpleado").value = datosSnap.ape;
    document.getElementById("cargo").value = datosSnap.cargo;
    document.getElementById("duiEmpleado").value = datosSnap.dui;
  });
    
}


function doSearch()
{/*esot es para buscar no aplicable en esta pagina*/
    var tableReg = document.getElementById('tablaEmpleados');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    var cellsOfRow="";
    var found=false;
    var compareWith="";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++)
    {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++)
        {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
            {
                found = true;
            }
        }
        if(found)
        {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
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
