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
var refCliente;
var ref_idCliente2;
var idCliente2;
var CREATE = "Agregar Cliente";
var UPDATE = "Actualizar Cliente";
var CAMBIO = CREATE;
var btnUpdate;

function inicializarPagina(){
    /*formularioDatos = document.getElementById('formDatos');
    formularioDatos.addEventListener("submit", enviarDatos, false);*/
    
    console.log("iniciando");

    tablaMostrar = document.getElementById("tabla");
    refCliente = firebase.database().ref().child("Clientes");
    //console.log(CAMBIO);
    mostrarTabla();
}    
/* Esta funcion recibe los id de cada campo sirve como un acotador para evitar escribir el document*/
function getID(id){
    return document.getElementById(id).value;
}
/* Esta funcion crea un arreglo que guardara los datos de la variables */
function arrayCliente(id,name,ape,cor,dui){
    var data = {id: id,name: name,ape: ape,cor: cor,dui: dui};
    return data;
}

/* Esta funcion insertara un nuevo empleado */
function ocultar(){
  /*  btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = "true";*/
}

function ocultar1(){
    /*var btnAdd = document.getElementById("btnAdd");
    btnAdd.hidden = "true";

    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.innerHTML="<input class='btn btn-primary ' type='submit' name='btnAdd' id='btnUpdate' value='Actualizar Cliente' onclick='"+updateCliente()+"'>"
*/
}
function insertCliente(){
    
    /* Declaracion de las variables que reciben los value de los campos */
    var id = getID("codCliente");
    var name = getID("nomCliente");
    var ape = getID("apeCliente");
    var cor = getID("cor");
    var dui = getID("duiCliente");
    console.log(name + " " + ape);
    
    if(id.length==0 || name.length == 0 || ape.length == 0 || cor.length == 0 || dui.length == 0){
        alert("Campos vacios "+id+name+ape+cor+dui);
        
    }else{
        var arrayData = arrayCliente(id,name,ape,cor,dui);
        console.log(arrayData);
        var newCliente = firebase.database().ref("Clientes");
        newCliente.push(arrayData);
        alert("Guardado En la Base");
        console.log("save");

        limpiar();
    }
    
}

function limpiar(){
    document.getElementById("codCliente").value = "";
    document.getElementById("nomCliente").value = "";
    document.getElementById("apeCliente").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("duiCliente").value = "";
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
        document.getElementById("codCliente").value = id1;
        //document.getElementById("nomEmpleado").value = aux;
        //alert(id);
        //getID("codEmpleado").value = aux;
       // console.log(aux);
    });
}

function updateCliente(){
    
    var id = getID("codCliente");
    var name = getID("nomCliente");
    var ape = getID("apeCliente");
    var cor = getID("cor");
    var dui = getID("duiCliente");
    console.log(name + " " + ape);

    if(id.length==0 || name.length == 0 || ape.length == 0 || cor.length == 0 || dui.length == 0){
        alert("Campos vacios");
    }else{
        var arrayData = arrayCliente(id,name,ape,cor,dui);
        console.log(arrayData);
        var newCliente = firebase.database().ref("Cliente").child(idClientw2);
        newCliente.update(arrayData);
        alert("Guardado En la Base");
        //console.log("save");
        limpiar();
    }
   
}

function mostrarTabla(){
    
    refCliente.on("value", function(snap) {
    var datosArray = snap.val();
    var filaDocumento = "";
    var n=1;
     console.log("hola");   
    for(var documento in datosArray){
        filaDocumento += "<tr>" +
                            "<td>"+ n +"</td>"+
                            "<td>"+ datosArray[documento].id +"</td>"+
                            "<td>"+ datosArray[documento].name +"</td>"+
                            "<td>"+ datosArray[documento].ape +"</td>"+
                            "<td>"+ datosArray[documento].cor +"</td>"+
                            "<td>"+ datosArray[documento].dui +"</td>"+
                            '<td>'+
                                '<button class="btn btn-danger borrarCliente" dataCliente = "'+documento+'">'+
                                  '<span class="fa fa-trash" ></span>'+
                                '</button>'+
                                '<button class="btn btn-info editarCliente " data-toggle="modal" data-target="#exampleModal" dataCliente2 = "'+documento+'" >'+
                                  '<span class="fa fa-edit" ></span>'+
                                '</button>'+
                             '</td>'+
                         "</tr>";
                         n=n+1;
        }
      
        tablaMostrar.innerHTML = filaDocumento;
        if(filaDocumento !== ""){
        
        var documentosEditar = document.getElementsByClassName('editarCliente');
        for (var i = 0; i < documentosEditar.length; i++) {
          documentosEditar[i].addEventListener("click",editarCliente,false);
        }
        var documentosBorrar = document.getElementsByClassName('borrarCliente');
        for (var i = 0; i < documentosBorrar.length; i++) {
          documentosBorrar[i].addEventListener("click",borrarCliente,false);
        }
      }
    });
  }

function borrarCliente() {
    var idCliente = this.getAttribute("dataCliente");
    var ref_idCliente = refCliente.child(idCliente);
    ref_idCliente.remove();
}

function editarCliente() {

    idCliente2 = this.getAttribute("dataCliente2");
    ref_idCliente2 = refCliente.child(idCliente2);
 

    ref_idCliente2.once("value",function(snap) {
    var datosSnap = snap.val();
    
    document.getElementById("codCliente").value = datosSnap.id;
    document.getElementById("nomCliente").value = datosSnap.name;
    document.getElementById("apeCliente").value = datosSnap.ape;
    document.getElementById("cor").value = datosSnap.cor;
    document.getElementById("duiCliente").value = datosSnap.dui;
  });
    
}

function doSearch()
    {/*esot es para buscar no aplicable en esta pagina*/
        var tableReg = document.getElementById('tablaProductos');
        var searchText = document.getElementById('searchTerm').value.toLowerCase();
        var cellsOfRow="";
        var found=false;
        var compareWith="";
                                 
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++){
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
