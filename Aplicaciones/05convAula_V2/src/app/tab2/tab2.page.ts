import { Component } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public usuario: any;
  public inputText: string;
  // public esClienteConPedido: boolean = false;
  // public esDeliveryBoy: boolean = false;
  chats: { texto: string, usuario: string, destino: string, hora: string }[] = [];
  public chatListoEntrega: any[] = [];
  // public cliente: string = "";
  usuarioLOG = {
    "correo": ""
  }

  constructor(public toastController: ToastController,
    private baseService: FirebaseService,
              public router: Router){
                // this.inicializarChats();
                let usuarioLogeado = JSON.parse(sessionStorage.getItem('Usuarios'));
                this.usuarioLOG.correo = usuarioLogeado.correo;
                this.traerChats();

              }

              

              mainM(){
                this.router.navigateByUrl('/tabinicial'); 
              }

              traerChats() {
                this.baseService.getItems('chat').then(chat => {
                    this.chats = chat.filter(ch => ch.aula == "PPS-4A" );
                
           
                });
              }



              doSend() {
              let usuarioLogeado = JSON.parse(sessionStorage.getItem('Usuarios'));

                let hora_fecha = (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString();
                let chat: any;
                  chat = {
                    texto: this.inputText,
                    usuario: usuarioLogeado.correo,
                    aula: "PPS-4A",
                    hora: hora_fecha
                  };
            
                this.baseService.addItem('chat', chat);
                this.inputText = "";
                this.traerChats();
              }


}
