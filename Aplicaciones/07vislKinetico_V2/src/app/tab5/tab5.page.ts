import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
 

const STORAGE_KEY = 'my_images';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

 
  images = [];
  // arrayImagenes;
  // imagenLS;
 
  constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath) { }
 
  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }

  ionViewDidEnter(){
    this.loadStoredImages();
  }
 
  loadStoredImages() {
    // localStorage.clear();
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        // console.log("Imagenes:  ", images);
        let arr = JSON.parse(images);
        // console.log("Array JSON parse: ", arr);

        this.images = [];

        for (let img of arr) {
          // console.log("IMG de array: ", img);
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          let varclasificacion =  img.substr(0,img.indexOf('.'));
          let varfecha =  
          // img.substring(img.indexOf('.')+1,img.length -4).substr(0,2) ;
          
          img.substring(img.indexOf('.')+1,img.length -4).substr(0,2)    //DIA
          +"/"+
          img.substring(img.indexOf('.')+1,img.length -4).substr(2,1)    //MES
          +"/"+
          img.substring(img.indexOf('.')+1,img.length -4).substr(3,4)  //AÑO
          ;


          let varUsuario = "admin";
          
          // localStorage.getItem('imagen').substring(localStorage.getItem('imagen').indexOf('.')+1,localStorage.getItem('imagen').length -4)
         
          
          this.images.push(
            { name: img,
              path: resPath,
              filePath: filePath,
              clasificacion:varclasificacion,
              fecha:varfecha,
              usuario: varUsuario
            });
        }


      }
    });

    // this.arrayImagenes = JSON.parse(localStorage.getItem('imagenes'));
    // for (let img of this.arrayImagenes) 
    // {
    //   this.imagenLS = img;
    //   console.log("Imagen Recorrida: ",img);
    // }
    // console.log("ArrayImagenes LS: ",this.arrayImagenes);
    // console.log("ARRAY DE IMAGENES SALIENDO: ", this.images);
    
    // localStorage.setItem('imagen', JSON.stringify(this.images));
    // console.log("LocalStorage: ", localStorage.getItem('imagen'));
    // console.log("ARRAY DE IMAGENES JSON: ", JSON.parse(this.images) );
    
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
 

  //PARA BORRAR IMAGENES
  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
 
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
 
        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast('File removed.');
        });
    });
}
}
