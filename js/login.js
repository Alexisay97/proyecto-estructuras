window.onload = initializePage;

/**Base de datos */
var config = {
    apiKey: "AIzaSyAUbxmM2KBuy5opW7Dlejd3v-EkBu2devk",
    authDomain: "bbbe-5b6fb.firebaseapp.com",
    databaseURL: "https://bbbe-5b6fb.firebaseio.com",
    projectId: "bbbe-5b6fb",
    storageBucket: "bbbe-5b6fb.appspot.com",
    messagingSenderId: "291653738479"
};
    firebase.initializeApp(config);

/** Variables Globales */
var refUsers;
var user;
var passwd;
var id1;
var txtUser;
var txtPasswd;
var imail;
function initializePage(){
    console.log("Iniciando");
    refUsers = firebase.database().ref().child("Usuarios");
    observador();
    comprobar();
}    

function getID(id){
    return document.getElementById(id).value;
}

function arrayUsers(id1,username,apeUser,cargo){
    var data = {id: id1,user: username,apeUser: apeUser,cargo:cargo}; /* Esto aqui es la misma sintaxy que un json usa la misma logica que cuando trabajabamos los documentos con json*/
    return data; /**Aqui retornas todo el arreglo del json */
}

function registro(){
    var username = getID("nomUser");
    id1 = getID("username");
    var apeuser = getID("apeUser");
    var cargo = getID("cargo");
    txtUser = getID("user");
    txtPasswd = getID("passwd");
    console.log(txtUser + " " +txtPasswd+"5");
    
    firebase.auth().createUserWithEmailAndPassword(txtUser, txtPasswd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error: " +errorMessage)
        // ...
    });

    var arrayData = arrayUsers(id,username,apeuser,cargo); /*/** aqui lo que haces se crea una variable que contendra los datos y la igualamos al arreglo que creamos hace ratos y le pasamos los datos de las variables que contienen el valor de los txt */
    console.log(arrayData); /**Solo imprimis nada mas para ver que si haya algo dentro del arreglo */
    var newUser = firebase.database().ref("Usuarios/"+id); /**Se crea una variable esta contendra la tabla ala que va conectar firebase en este caso es ProySer */
    newUser.set(arrayData); /* y aqui atraves de la funcion push mandas el arreglo completo a esa tabla el push te permite que firebase genere automaticamente los nombres de cada nuevo nodo si no tendrias que ponerselo vos lo cual seria un completo desmadre */
    alert("Guardado En la Base");
    console.log("save");
}

function ingreso(){
    txtUser = getID("user");
    txtPasswd = getID("passwd");

    firebase.auth().signInWithEmailAndPassword(txtUser, txtPasswd).then(function(){
    var url="index.html";
    document.location.target = "_blank";
    document.location.href=url;}).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error:" +errorCode);
        console.log("Error: " +errorMessage);
        // ...
      });
}

function insertar(){
    

}
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(email);
          imail = email;
          
          // ...
        } else {
          // User is signed out.
          // ...
         
          
        }
      });
}

function comprobar(){
    
    //txtUser = getID("user");
    //txtPasswd = getID("passwd");
    //console.log(txtUser + " " +txtPasswd);
   /*   
    refUsers.on("value", function(snap){
    var datos = snap.val();
    var aux=0;

        for(var documemento1 in datos){
            console.log(datos[documemento1].id);
            console.log(datos[documemento1].user);
            console.log(datos[documemento1].cargo);
        }
        
        //console.log(arrayUser);
        if(aux == 1){
            alert("acceso");
        }
    });
*/
    //var db = firebase.database();
    //var ref = db.ref('Usuarios')
    //console.log(ref);
    /*
    refUsers.orderByChild("email").;
    console.log(refUsers);

    if(id1 == 1){
       menu();
       console.log("i am here");
       sessionStorage.setItem('id',id1);
    }else{
        /**abrir el index normal */
 //   }
}

function menu(){
    
    if(sessionStorage.getItem('id') == 1){
        var empleados = document.getElementById("empleados");
        var usuarios = document.getElementById("usuarios");
        var del = docuement.getElementById("del");
        var edit = docuement.getElementById("edit");

        empleados.hidden;
        usuarios.hidden;
        del.disabled;
        edit.disabled; 
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

