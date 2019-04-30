import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  image: any; 

  // const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  constructor(private camera: Camera) { }
 
  sacarFoto(){

    let options: CameraOptions = {
      // destinationType: this.camera.DestinationType.DATA_URL,
      // targetWidth: 1000,
      // targetHeight: 1000,
      // quality: 100

      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

      //DOCU OFICIAL
      // CameraOptions = {
        // quality: 100,
        // destinationType: this.camera.DestinationType.FILE_URI,
        // encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE

    }


    this.camera.getPicture( options )
    .then(imageData => {
      // this.image = 'data:image/jpeg;base64,' ${imageData};
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });

      //DOCU OFICIAL
    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   this.image = 'data:image/jpeg;base64,' + imageData;
    //  }, (err) => {
    //   // Handle error
    //   console.log("Camera issue:" + err);
    //  });


  }

}
