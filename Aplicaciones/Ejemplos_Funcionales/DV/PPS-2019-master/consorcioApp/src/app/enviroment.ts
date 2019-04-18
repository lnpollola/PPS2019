export const FIREBASE_CONFIG = {   
        apiKey: "AIzaSyD-xEm1QiOBZTN8bnV0ACCID9TzGYVnreE",
        authDomain: "consorcioapp-209d4.firebaseapp.com",
        databaseURL: "https://consorcioapp-209d4.firebaseio.com",
        projectId: "consorcioapp-209d4",
        storageBucket: "consorcioapp-209d4.appspot.com",
        messagingSenderId: "884050654811"    
};

export const ListaUsuarios = snapshot => {
    let ArrayUsuarios = [];
    console.log("entro en la lista de usuarios");
    snapshot.forEach(element => {
        console.log(element.val());
        let item = element.val();
        item.key = element.key;
        ArrayUsuarios.push(item);
    });
    console.log(ArrayUsuarios);
    return ArrayUsuarios;
}