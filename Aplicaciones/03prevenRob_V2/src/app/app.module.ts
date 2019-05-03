import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Agregadas:
// import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from "../app/auth.service";
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';


export const firebaseConfig = {
  apiKey: "AIzaSyCgZJJ4U7kzVVSbY8u2wODFSmUQCSEg36Y",
  authDomain: "ppsappvecinal.firebaseapp.com",
  databaseURL: "https://ppsappvecinal.firebaseio.com",
  projectId: "ppsappvecinal",
  storageBucket: "ppsappvecinal.appspot.com",
  messagingSenderId: "205973701461"
};



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Gyroscope,
    DeviceMotion
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
