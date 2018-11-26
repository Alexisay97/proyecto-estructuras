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

    tablaMostrar = document.getElementById("tablaProductos"); //** Aqui seleccionas la tabla que vas usar esto debe ir en tbody el id no en el table */
    refEmpleados = firebase.database().ref().child("ProySer"); /* Aqui haces referencia a la /*/
    //console.log(CAMBIO);
    mostrarTabla();
}    
/* Esta funcion recibe los id de cada campo sirve como un acotador para evitar escribir el document*/
function getID(id){
    return document.getElementById(id).value;
}
/* Esta funcion crea un arreglo que guardara los datos de la variables */
function arrayEmpleado(id,name,descP,tipo,precio){
    var data = {id: id,name: name,descP: descP,tipo: tipo,precio: precio}; /* Esto aqui es la misma sintaxy que un json usa la misma logica que cuando trabajabamos los documentos con json*/
    return data; /**Aqui retornas todo el arreglo del json */
}

/* Esta se supone que es para ocultar el boton de actulizar en el modal lo malo que solo funciona cuando le viene en gana */
function ocultar(){
    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = "true";
}
 /** Esta hace basicamento lo mismo pero crea el boton update ya que la otra lo esconde */
function ocultar1(){
    var btnAdd = document.getElementById("btnAdd");
    btnAdd.hidden = "true";

    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.innerHTML="<input class='btn btn-primary ' type='submit' name='btnAdd' id='btnUpdate' value='Actualizar Empleado' onclick='"+updateEmpleado()+"'>"
}
/**y Aqui es ya donde vas insertar los datos a la tabla por llamarla asi */
function insert(){
    
    /* Declaracion de las variables que reciben los value de los campos */
    var id = getID("codP"); /*/** getID lo que hace es usar esa funcion que te evita escribir el document.getElement */
    var name = getID("nomP");
    var descP = getID("descP");
    var tipo = getID("tipo");
    var precio = getID("precio");
    
    /**Aqui comprobas que los cmapos no se vayan vacio */
    if(id.length==0 || name.length == 0 || descP.length == 0 || tipo.length == 0 || precio.length == 0){
        alert("Campos vacios ");/**Tiras una alerta en caso que esten vacios */
    }else{
        
        var arrayData = arrayEmpleado(id,name,descP,tipo,precio); /*/** aqui lo que haces se crea una variable que contendra los datos y la igualamos al arreglo que creamos hace ratos y le pasamos los datos de las variables que contienen el valor de los txt */
        console.log(arrayData); /**Solo imprimis nada mas para ver que si haya algo dentro del arreglo */
        var newEmpleado = firebase.database().ref("ProySer"); /**Se crea una variable esta contendra la tabla ala que va conectar firebase en este caso es ProySer */
        newEmpleado.push(arrayData); /* y aqui atraves de la funcion push mandas el arreglo completo a esa tabla el push te permite que firebase genere automaticamente los nombres de cada nuevo nodo si no tendrias que ponerselo vos lo cual seria un completo desmadre */
        alert("Guardado En la Base");
        console.log("save");

        limpiar(); /**limpias todos los campos del modal */
    }
    
}
/**limpia todos los campos del modal
 *
 */
function limpiar(){
    document.getElementById("codP").value = "";
    document.getElementById("nomP").value = "";
    document.getElementById("descP").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("precio").value = "";
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
        document.getElementById("codP").value = id1;
        //document.getElementById("nomEmpleado").value = aux;
        //alert(id);
        //getID("codEmpleado").value = aux;
       // console.log(aux);
    });
}

/**Bien aqui esta lo bonito actualizar basicamente
 * hacemos lo mismo que insertar pero la unica diferencia es que le vamos a cambiar el push por el update
 * y le vamos a pasar el id del nodo que va a modificar
 * 
 */

function updateEmpleado(){
    
    var id = getID("codP");
    var name = getID("nomP");
    var descP = getID("descP");
    var tipo = getID("tipo");
    var precio = getID("precio");

    if(id.length==0 || name.length == 0 || descP.length == 0 || tipo.length == 0 || precio.length == 0){
        alert("Campos vacios ");
    }else{
        
        var arrayData = arrayEmpleado(id,name,descP,tipo,precio);
        console.log(arrayData);
        var newEmpleado = firebase.database().ref("ProySer").child(idEmpleado2); /** Eso se hace aqui le decis qe\ue hara referencia a la tabla ProySer y a su nodo hijo idEmpleado2  */
        newEmpleado.update(arrayData); /**Y te preguntaras de donde ese idEmpleado2 pues es una variable global que la tomamos de la tabla mira el code de mostrar tabla */
        alert("!! El dato a sido actualizado !!");
        console.log("save");

        limpiar();
    }
   
}

/**Bien la funcion mostrar tabla que es lo que hace
 * 1 trae los datos de la base de datos de firebase
 * a traves de refEmpleados lo que haces es que te conectas a la tabl,a que ya fue declarada antes
 * y haces una captura de los datos que hay ahi dentro
 * luego creas una variable qeu se llama datosArray que guarda la captura de todo el contenido de la tabla
 * y luego una variable llamada filaDocumento que se encargara de contener la tabla
 */
function mostrarTabla(){
    
    refEmpleados.on("value", function(snap) {
    var datosArray = snap.val();
    var filaDocumento = "";
    var n=1; /**Es nada mas para el contador de la cantidad de datos que hay en la tabla */
        
    for(var documento in datosArray){ /**con el for vas recorriendo todo el documento */
        filaDocumento += "<tr>" +
                            "<td>"+ n +"</td>"+
                            "<td>"+ datosArray[documento].id +"</td>"+ /**y aqui vas llamando cada dato segun el nombre del documento */
                            "<td>"+ datosArray[documento].name +"</td>"+
                            "<td>"+ datosArray[documento].descP +"</td>"+
                            "<td>"+ datosArray[documento].tipo +"</td>"+
                            "<td>"+ datosArray[documento].precio +"</td>"+
                            '<td>'+
                                '<button class="btn btn-danger borrarEmpleado" id="del" dataEmpleado = "'+documento+'">'+ /** vaya aqui documento guarda el id de cada nodo */
                                  '<span class="fa fa-trash" ></span>'+ /** esto de aqui son los iconos  */
                                '</button>'+
                                '<button class="btn btn-info editarEmpleado " id="edit" data-toggle="modal" data-target="#exampleModal" dataEmpleado2 = "'+documento+'" >'+
                                  '<span class="fa fa-edit" ></span>'+
                                '</button>'+
                             '</td>'+
                         "</tr>";
                         n=n+1; /**el contador */
        }
      
        tablaMostrar.innerHTML = filaDocumento; /**vaya aqui lo que vas haciendo es ir imprimiendo lo que hay dentro de filadocumento */
        if(filaDocumento !== ""){
        
            /**
             * vaya esta lo que hace es permitirte lo de editar llama la clase editar empleado que esta creada mas abajo
             * lo que haces es ir tomando los id segun el que vayas a modificar la de elimnar hace lo mismo 
             * */
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
/**aqui la de borrar recibe el atributo documento que se le paso atravez de data empleado 
 * lo que hace es tomar el id de esa fila y luego la elimina
 */
function borrarEmpleado() {
    var idEmpleado = this.getAttribute("dataEmpleado");
    var ref_idEmpleado = refEmpleados.child(idEmpleado);
    ref_idEmpleado.remove();
}
/**vaya la de editar trabaja en conjunto con la de Update
 * primero toma el id o el atributo que tiene docuemnto en la tabla asi sabremos cual vamos a modificar
 * luego se guarda en la variable ref_idEmpleado2
 * luego haecemos la consulata de nuevo a la tabla pero especificamente para ese id
 * y ya luego lo cargamos en cada textfield
 * y eso \, eso, eso es todo amigos
 */
function editarEmpleado() {

    idEmpleado2 = this.getAttribute("dataEmpleado2");
    ref_idEmpleado2 = refEmpleados.child(idEmpleado2);
 

    ref_idEmpleado2.once("value",function(snap) {
    var datosSnap = snap.val();
    
    document.getElementById("codP").value = datosSnap.id;
    document.getElementById("nomP").value = datosSnap.name;
    document.getElementById("descP").value = datosSnap.descP;
    document.getElementById("tipo").value = datosSnap.tipo;
    document.getElementById("precio").value = datosSnap.precio;
  });
    
}
/**
 * esta es la que busca en la tabla solo copia y pega porque esta cosa ni yo le entendio pero funciona y es lo que importa
 * para usarla solo llama la funcion doSearch en el input que vas a buscar lo vas hacer con el evento onkeyup creo que se llama y eso es todo para usar esta funcion
 */
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