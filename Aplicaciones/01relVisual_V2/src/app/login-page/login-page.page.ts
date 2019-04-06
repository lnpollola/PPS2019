// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login-page',
//   templateUrl: './login-page.page.html',
//   styleUrls: ['./login-page.page.scss'],
// })
// export class LoginPagePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

/**
 * Ionic4 Firebase Starter Kit (https://store.enappd.com/product/firebase-starter-kitionic4-firebase-starter)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from "../auth.service";
// import * as firebase from 'firebase/app';


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

  constructor(
    private platform: Platform, 
    public loadingController: LoadingController,
    public alertController:AlertController,
    private splashScreen: SplashScreen,
    // public util: utilService, 
    private menuCtrl: MenuController, 
    // private authServ: AuthenticationService,
    private firebaseAuthentication: FirebaseAuthentication, 
    private auth: AuthService, 
    private router: Router
    ) {
  }

  ngOnInit() {
   
  }

   login() {
        
      this.auth.loginUser(this.email,this.password ).then((user) => {
        this.alertaMensaje(true);  
        this.router.navigateByUrl('/tabs'); 
        }
        ) 
        .catch(err=>{
          
          this.alertaMensaje(false);  
        });

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