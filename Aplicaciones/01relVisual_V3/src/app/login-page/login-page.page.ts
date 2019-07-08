import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController,  ActionSheetController, ToastController   } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from "../auth.service";

import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  providers: [FirebaseAuthentication, AuthService],
})
export class LoginPagePage implements OnInit {
  email = "";
  password = "";
  routerLink = "";
  splash = true;
  spinner:boolean ; 
  usuarios: any[];
  cuenta: { usuario: string, password: string } = {
    usuario: '',
    password: ''
  };


  ionViewDidEnter() {
    setTimeout(() => this.splash = false, 4000);
  }

  constructor(
    // private platform: Platform, 
    // private splashScreen: SplashScreen,
    // public util: utilService, 
    // private menuCtrl: MenuController, 
    // private authServ: AuthenticationService,
    // private firebaseAuthentication: FirebaseAuthentication, 
    
    private baseService: FirebaseService,
    public loadingController: LoadingController,
    public alertController:AlertController,
    private auth: AuthService, 
    private router: Router,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController
    ) {
  }

  ngOnInit() {
   
  }

  //  login() {
  //    this.spinner = true;
        
  //     this.auth.loginUser(this.email,this.password ).then((user) => {

  //       setTimeout(() => this.spinner = false , 3000);
        
  //       this.creoToast(true);  
  //       this.router.navigateByUrl('/tabs'); 

  //       }
  //       ) 
  //       .catch(err=>{
          
  //         this.creoToast(false);  
  //       });

  //     }

      login()
      {
        // console.log(this.cuenta);
        this.spinner = true; 
        this.baseService.getItems("Usuarios").then(users => {
          setTimeout(() => this.spinner = false, 2000);
          // console.log(this.usuarios);
          // console.log(users);
    
          this.usuarios = users;
    
          let usuarioLogueado = this.usuarios.find(elem => (elem.correo == this.cuenta.usuario && elem.clave == this.cuenta.password));
          // console.log(usuarioLogueado);
          // console.log(this.cuenta);
          if (usuarioLogueado !== undefined) {
            sessionStorage.setItem('Usuarios', JSON.stringify(usuarioLogueado));
    
            // this.events.publish('usuarioLogueado', usuarioLogueado.perfil);
            this.creoToast(true);
     
            this.router.navigateByUrl('/tabs'); 

            
          }
          else{
            this.creoToast(false);
          }
        });
      }


      
  async creoSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ingresar como ...',
      cssClass: 'actSheet',
      buttons: [{
        text: 'admin',
        icon: 'finger-print',
        handler: () => {
          
          this.cuenta.usuario = "admin@gmail.com";
          this.cuenta.password= "admin1111";

        }
      }, {
        text: 'invitado',
        icon: 'information-circle-outline',
        handler: () => {
          this.cuenta.usuario = "invitado@gmail.com";
          this.cuenta.password= "invitado2222";
        }
      }, {
        text: 'usuario',
        icon: 'person',
        handler: () => {
          this.cuenta.usuario = "usuario@gmail.com";
          this.cuenta.password= "usuario3333";
        }
      }, {
        text: 'anonimo',
        icon: 'help',
        handler: () => {
          this.cuenta.usuario = "anonimo@gmail.com";
          this.cuenta.password= "anonimo4444";
        }
      },{
        text: 'tester',
        icon: 'desktop',
        handler: () => {
          this.cuenta.usuario = "tester@gmail.com";
          this.cuenta.password= "tester5555";
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'btnCancel',
        role: 'cancel',
        handler: () => {
         
        }
      }]
    });
    await actionSheet.present();
  }
  
      async creoToast(rta: boolean) {

        if(rta == true)
        {
          const toast = await this.toastController.create({
            message: 'Autenticación exitosa.',
            color: 'success',
            showCloseButton: false,
            position: 'top',
            closeButtonText: 'Done',
            duration: 2000 
          });
      
          toast.present();
    
    
        }
        else{
          const toast = await this.toastController.create({
            message: 'Usuario/contraseña incorrectos.',
            color: 'danger',
            showCloseButton: false,
            position: 'bottom',
            closeButtonText: 'Done',
            duration: 2000 
          });
      
          toast.present();
    
        }
       
          
      }


    async alertaMensaje(estado: boolean) {
   
        if(estado == true)
        {
          const alert = await this.alertController.create({
            header: 'Bienvenido.',
            subHeader: '',
            message: 'Autenticación exitosa.',
            buttons: ['OK']
          });
      
          await alert.present();
         
    
        }
        else{
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: '',
            message: 'Usuario/Contraseña incorrectos.',
            buttons: ['OK']
          });
      
          await alert.present();
    
        }
      }
}