export const FIREBASE_CONFIG = {
   
    apiKey: "AIzaSyD7Txx_Hb2du2JwpLPemk7_bOW2lGT4EJQ",
    authDomain: "antiladriapp.firebaseapp.com",
    databaseURL: "https://antiladriapp.firebaseio.com",
    projectId: "antiladriapp",
    storageBucket: "antiladriapp.appspot.com",
    messagingSenderId: "772764165439"

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

