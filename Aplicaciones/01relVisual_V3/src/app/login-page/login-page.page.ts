import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController,  ActionSheetController, ToastController   } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from "../auth.service";


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

  ionViewDidEnter()      
  {
    setTimeout(() => this.splash = false, 4000);
  }

  constructor(
    // private platform: Platform, 
    // private splashScreen: SplashScreen,
    // public util: utilService, 
    // private menuCtrl: MenuController, 
    // private authServ: AuthenticationService,
    // private firebaseAuthentication: FirebaseAuthentication, 
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

   login() {
        
      this.auth.loginUser(this.email,this.password ).then((user) => {

        this.creoToast(true);  
        this.router.navigateByUrl('/tabs'); 

        }
        ) 
        .catch(err=>{
          
          this.creoToast(false);  
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
          
          this.email = "admin@gmail.com";
          this.password= "admin1111";

        }
      }, {
        text: 'invitado',
        icon: 'information-circle-outline',
        handler: () => {
          this.email = "invitado@gmail.com";
          this.password= "invitado2222";
        }
      }, {
        text: 'usuario',
        icon: 'person',
        handler: () => {
          this.email = "usuario@gmail.com";
          this.password= "usuario3333";
        }
      }, {
        text: 'anonimo',
        icon: 'help',
        handler: () => {
          this.email = "anonimo@gmail.com";
          this.password= "anonimo4444";
        }
      },{
        text: 'tester',
        icon: 'desktop',
        handler: () => {
          this.email = "tester@gmail.com";
          this.password= "tester5555";
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