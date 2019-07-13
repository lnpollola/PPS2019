// import { Component } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router } from "@angular/router";
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FirebaseService } from "../services/firebase.service";

import * as firebase from 'firebase';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  cosasLindas = "LINDAS";
  cosasFeas = "FEAS";
  clasificacion:string ;
  
  images = [];
  spinner = false;

  imagen:any;
  captureDataUrl: Array<string> ;
  hayFotos: boolean = false;
  cantidadFotos: number = 0;
  usuarioLogueado: any;
  // constructor(private camera: Camera) { }

  
  constructor(
    private camera: Camera, 
    private file: File, 
    private http: HttpClient, 
    private webview: WebView,
    
    public router: Router,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private storage: Storage, 
    private plt: Platform, 
    
    public baseService: FirebaseService,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef, 
    private filePath: FilePath) 
    {

        this.captureDataUrl = new Array<string>();
        this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
 
      
     }
 
  ngOnInit() {
  
  }
 
  
  greenB(){
    this.router.navigateByUrl('/tab5'); 

  }
  redB(){
    this.router.navigateByUrl('/'); 

  }

 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }
 

  async selectImage(clasificacionFoto:string) 
  {
    this.clasificacion = clasificacionFoto;
    this.capturar();
    
  }
 

  
  capturar(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
      // sourceType: PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture( options )
    .then( imageData => {
      // this.imagen=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.captureDataUrl.push('data:image/jpeg;base64,' + imageData);
      // console.log("caputeradata", this.captureDataUrl);
      this.hayFotos = true;
      this.cantidadFotos += 1;

      

    })
    .catch(error =>{
      console.error( error );
    });

   
   

  }

  
  guardaImg(){

    this.spinner = true;
    let storageRef = firebase.storage().ref();
    let errores: number = 0;
    // let contador: number = 0;
    let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
    let date: Date = new Date();
    let fechaSubida = {
      dia: date.getDate(),
      mes: date.getMonth(),
      hora: date.getHours(),
      minuto: date.getMinutes()
    }
    let votacion = {
      votaAdmin: false,
      votaInvitado: false,
      votaUsuario: false,
      votaAnonimo: false,
      votaTester: false
    }
    // console.log("captureData 2", this.captureDataUrl);

      this.captureDataUrl.forEach(foto => {
        let numeroRandom = Math.floor(Math.random() * Math.floor(1000000));

        let filename: string = this.usuarioLogueado.correo + "_" + numeroRandom;
        const imageRef = storageRef.child(`1relVis/${filename}.jpg`);
      

        let objetoEnviar = {
          "nombreFile": filename,
          "correo": usuarioLogueado.correo,
          "fechaSubida": fechaSubida,
          "tipo": this.clasificacion,
          "url": foto,
          "likes": 0,
          "votacion": votacion
        }
  
        this.baseService.addItem('cosasEdificio', objetoEnviar);

      // console.log(imageRef);
      imageRef.putString(foto, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

      })
        .catch(() => {
          errores++;
        });
    });

    if (errores == 0) 
    {
      this.creoToast(true);
      this.spinner = false;
      this.captureDataUrl = new Array<string>();
    }
    else 
    {
      this.creoToast(false);
      this.spinner = false;
    }
  

  }
  
  async creoToast(rta: boolean) {

    if(rta == true)
    {
      const toast = await this.toastController.create({
        message: 'Imagenes subidas con exito.',
        color: 'dark',
        showCloseButton: false,
        position: 'top',
        closeButtonText: 'Done',
        duration: 2000 
      });
  
      toast.present();


    }
    else{
      const toast = await this.toastController.create({
        message: 'Error cargar imagen',
        color: 'dark',
        showCloseButton: false,
        position: 'top',
        closeButtonText: 'Done',
        duration: 2000 
      });
  
      toast.present();

    }
  }
  

}
