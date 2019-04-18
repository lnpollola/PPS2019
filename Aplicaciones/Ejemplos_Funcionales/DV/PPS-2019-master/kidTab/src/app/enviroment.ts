export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAf9tgrB7UiDo2IuK6S8Ln84-vTiRGNYQw",
    authDomain: "kidtab-1a8ec.firebaseapp.com",
    databaseURL: "https://kidtab-1a8ec.firebaseio.com",
    projectId: "kidtab-1a8ec",
    storageBucket: "kidtab-1a8ec.appspot.com",
    messagingSenderId: "1053219827491"
  };

export const ListaUsuarios = snapshot => {
    let ArrayUsuarios = [];

    snapshot.forEach(element => {
        console.log(element.val());
        let item = element.val();
        item.key = element.key;
        ArrayUsuarios.push(item);
    });

    return ArrayUsuarios;
}

// export const USUARIOSTEST = {
//      ArrayTest = [{
    
//     {"id":1,"correo":"admin@gmail.com","clave":1111,"perfil":"admin","sexo":"femenino"},
//     {"id":2,"correo":"invitado@gmail.com","clave":2222,"perfil":"invitado","sexo":"femenino"},
//     {"id":3,"correo":"usuario@gmail.com","clave":3333,"perfil":"usuario","sexo":"masculino"},
//     {"id":4,"correo":"anonimo@gmail.com","clave":4444,"perfil":"usuario","sexo":"masculino"},
//     {"id":5,"correo":"tester@gmail.com","clave":5555,"perfil":"tester","sexo":"femenino"}
//     }]




// };´

export const UsuariosTest = () => {
    let ArrayUsuariosTest = [
        {"id":1,"correo":"admin@gmail.com","clave":1111,"perfil":"admin","sexo":"femenino"},
        {"id":2,"correo":"invitado@gmail.com","clave":2222,"perfil":"invitado","sexo":"femenino"},
        {"id":3,"correo":"usuario@gmail.com","clave":3333,"perfil":"usuario","sexo":"masculino"},
        {"id":4,"correo":"anonimo@gmail.com","clave":4444,"perfil":"usuario","sexo":"masculino"},
        {"id":5,"correo":"tester@gmail.com","clave":5555,"perfil":"tester","sexo":"femenino"}
    ];


    return ArrayUsuariosTest;
}

