// import { Component } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
 
 
  
 
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
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
    
    // this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
 
  // takePicture(sourceType: PictureSourceType) {
  //   var options: CameraOptions = {
  //       quality: 100,
  //       sourceType: sourceType,
  //       saveToPhotoAlbum: false,
  //       correctOrientation: true
  //   };
 
  //   this.camera.getPicture(options).then(imagePath => {
  //           var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  //           var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  //           this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  //   });
 
  // }

  
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
      console.log("caputeradata", this.captureDataUrl);
      this.hayFotos = true;
      this.cantidadFotos += 1;

      

    })
    .catch(error =>{
      console.error( error );
    });

   
   

  }

  //FUNCIONES PARA LOGRAR DIRECTORIOS PATH
//   createFileName() {
//     var d = new Date(),
//         dia = d.getDate(),
//         mes = d.getMonth()+1,
//         año = d.getFullYear(),
//         // n = d.getTime(),,
//         // newFileName = this.clasificacion + n + ".jpg";
//         newFileName = this.clasificacion + "."+ dia + mes + año + ".jpg";
//     return newFileName;
// }
 
  // copyFileToLocalDir(namePath, currentName, newFileName) {
  //     this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
  //         this.updateStoredImages(newFileName);
  //     }, error => {
  //         this.presentToast('Error while storing file.');
  //     });
  // }


  
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
    console.log("captureData 2", this.captureDataUrl);

      this.captureDataUrl.forEach(foto => {
        let numeroRandom = Math.floor(Math.random() * Math.floor(1000000));

        let filename: string = this.usuarioLogueado.correo + "_" + numeroRandom;
        const imageRef = storageRef.child(`1relVis/${filename}.jpg`);
      

        let objetoEnviar = {
          "nombreFile": filename,
          "correo": usuarioLogueado.correo,
          "fechaSubida": fechaSubida,
          // "tipo": clasificacion,
          "url": foto,
          "likes": 0
          
        }
  
        this.baseService.addItem('cosasEdificio', objetoEnviar);

      console.log(imageRef);
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
  
  // updateStoredImages(name) {

  //   let objetoEnviar = {
  //     "nombreFile": name
  //     // ,
  //     // "correo": usuarioLogueado.correo,
  //     // "fechaSubida": fechaSubida,
  //     // "tipo": "cosalinda",
  //     // "url": foto,
  //     // "likes": 0
      
  //   }

  //   this.baseService.addItem('cosasEdificio', objetoEnviar);

  //   this.storage.get(STORAGE_KEY).then(images => {
  //       let arr = JSON.parse(images);
  //       if (!arr) {
  //           let newImages = [name];
  //           this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
  //       } else {
  //           arr.push(name);
  //           this.storage.set(STORAGE_KEY, JSON.stringify(arr));
  //       }
 
  //       let filePath = this.file.dataDirectory + name;
  //       let resPath = this.pathForImage(filePath);
 
  //       let newEntry = {
  //           name: name,
  //           path: resPath,
  //           filePath: filePath
  //           // clasif: 'HCCLASIF'
  //       };
 
        
  //       // this.images = [newEntry, ...this.images];
  //       // console.log("IMAGENES DEL UPLOAD: ", this.images);
  //       // localStorage.setItem('imagenes', JSON.stringify(this.images));
  //       // console.log("LocalStorage de subida GET: ", localStorage.getItem('imagenes'));
  //       // this.ref.detectChanges(); // trigger change detection cycle
  //   });
  // }

}
