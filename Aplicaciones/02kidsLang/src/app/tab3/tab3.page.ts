import { Component } from "@angular/core";
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{


  idiomaSeleccionado = "ES";

  constructor(private nativeAudio: NativeAudio) {
    //ANIMALES
   
      //ES
      this.nativeAudio.preloadSimple('rojo', 'assets/sounds/rojo_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('verde', 'assets/sounds/verde_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('amarillo', 'assets/sounds/amarillo_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('celeste', 'assets/sounds/celeste_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('violeta', 'assets/sounds/violeta_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
   
    //EN
    this.nativeAudio.preloadSimple('rojo_EN', 'assets/sounds/rojo_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('verde_EN', 'assets/sounds/verde_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('amarillo_EN', 'assets/sounds/amarillo_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('celeste_EN', 'assets/sounds/celeste_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('violeta_EN', 'assets/sounds/violeta_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
     
  }

  playRojo(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('rojo').then((success)=>{this.nativeAudio.unload('rojo');},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('rojo_EN').then((success)=>{this.nativeAudio.unload('rojo_EN');},(error)=>{console.log(error);});}
  }
  playVerde(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('verde').then((success)=>{this.nativeAudio.unload('verde');},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US')  {this.nativeAudio.play('verde_EN').then((success)=>{this.nativeAudio.unload('verde_EN');},(error)=>{console.log(error);});}
  }
 
  playAmarillo(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('amarillo').then((success)=>{this.nativeAudio.unload('amarillo');},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US')   {this.nativeAudio.play('amarillo_EN').then((success)=>{this.nativeAudio.unload('amarillo_EN');},(error)=>{console.log(error);});}
  }
  
  playCeleste(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('celeste').then((success)=>{this.nativeAudio.unload('celeste');},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('celeste_EN').then((success)=>{this.nativeAudio.unload('celeste_EN');},(error)=>{console.log(error);});}
  }

  playVioleta(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('violeta').then((success)=>{this.nativeAudio.unload('violeta');},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US')  {this.nativeAudio.play('violeta_EN').then((success)=>{this.nativeAudio.unload('violeta_EN');},(error)=>{console.log(error);});}
  }
}



