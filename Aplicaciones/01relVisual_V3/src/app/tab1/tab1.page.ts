import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  image: any; 

  constructor(private camera: Camera) { }
 
  sacarFoto(){

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture( options )
    .then( (imageData) => {
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
