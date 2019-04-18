export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB0SiW049Kh4fMRvgmhcYXYxddj5R15O0A",
    authDomain: "qrecarga-f8687.firebaseapp.com",
    databaseURL: "https://qrecarga-f8687.firebaseio.com",
    projectId: "qrecarga-f8687",
    storageBucket: "qrecarga-f8687.appspot.com",
    messagingSenderId: "313113654849"
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

