import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit   {


  idiomaSeleccionado = "ES";

  // ionViewDidEnter() 
  // {
  //    //ES
  //    this.nativeAudio.preloadSimple('uno', 'assets/sounds/uno_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //    this.nativeAudio.preloadSimple('dos', 'assets/sounds/dos_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //    this.nativeAudio.preloadSimple('tres', 'assets/sounds/tres_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //    this.nativeAudio.preloadSimple('cuatro', 'assets/sounds/cuatro_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //    this.nativeAudio.preloadSimple('cinco', 'assets/sounds/cinco_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
   
  
  //  //EN
  //  this.nativeAudio.preloadSimple('uno_EN', 'assets/sounds/uno_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //  this.nativeAudio.preloadSimple('dos_EN', 'assets/sounds/dos_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //  this.nativeAudio.preloadSimple('tres_EN', 'assets/sounds/tres_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //  this.nativeAudio.preloadSimple('cuatro_EN', 'assets/sounds/cuatro_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  //  this.nativeAudio.preloadSimple('cinco_EN', 'assets/sounds/cinco_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
  // }

  constructor(private nativeAudio: NativeAudio) {
    // //ANIMALES
   
    //   //ES
    //   this.nativeAudio.preloadSimple('uno', 'assets/sounds/uno_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    //   this.nativeAudio.preloadSimple('dos', 'assets/sounds/dos_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    //   this.nativeAudio.preloadSimple('tres', 'assets/sounds/tres_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    //   this.nativeAudio.preloadSimple('cuatro', 'assets/sounds/cuatro_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    //   this.nativeAudio.preloadSimple('cinco', 'assets/sounds/cinco_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
   
    // //EN
    // this.nativeAudio.preloadSimple('uno_EN', 'assets/sounds/uno_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    // this.nativeAudio.preloadSimple('dos_EN', 'assets/sounds/dos_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    // this.nativeAudio.preloadSimple('tres_EN', 'assets/sounds/tres_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    // this.nativeAudio.preloadSimple('cuatro_EN', 'assets/sounds/cuatro_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    // this.nativeAudio.preloadSimple('cinco_EN', 'assets/sounds/cinco_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
     
  }
  ngOnInit() {
    
 // NUMEROS
   
      //ES
      this.nativeAudio.preloadSimple('uno', 'assets/sounds/uno_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('dos', 'assets/sounds/dos_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('tres', 'assets/sounds/tres_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('cuatro', 'assets/sounds/cuatro_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('cinco', 'assets/sounds/cinco_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
   
    //EN
    this.nativeAudio.preloadSimple('uno_EN', 'assets/sounds/uno_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('dos_EN', 'assets/sounds/dos_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('tres_EN', 'assets/sounds/tres_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('cuatro_EN', 'assets/sounds/cuatro_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    this.nativeAudio.preloadSimple('cinco_EN', 'assets/sounds/cinco_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    

  }

  playUno(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('uno').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('uno_EN').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
  playDos(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('dos').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('dos_EN').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
 
  playTres(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('tres').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('tres_EN').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
  
  playCuatro(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('cuatro').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('cuatro_EN').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }

  playCinco(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('cinco').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('cinco_EN').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }

}
