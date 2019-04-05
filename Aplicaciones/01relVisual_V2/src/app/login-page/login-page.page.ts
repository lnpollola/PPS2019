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
// import { utilService } from '../services/util/util.service';
// import { AuthenticationService } from '../services/firestore/firebase-authentication.service';
// import { IfStmt } from '@angular/compiler';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  email = "";
  password = "";
  routerLink = "";

  constructor(private platform: Platform, public loadingController: LoadingController,
    public alertController:AlertController,
    private splashScreen: SplashScreen,
    // public util: utilService, 
    private menuCtrl: MenuController, 
    // private authServ: AuthenticationService
    // private firebaseAuthentication: FirebaseAuthentication, 
    // private auth: AuthService, 
    private router: Router,
      // public alertController: AlertController
    ) {
  }

  ngOnInit() {
   
  }

  // ionViewDidEnter() {
  //   this.menuCtrl.enable(false, 'start');
  //   this.menuCtrl.enable(false, 'end');
  //   this.splashScreen.hide();
  // }

   login() {
        
        this.router.navigateByUrl('/tabs');
      }
}