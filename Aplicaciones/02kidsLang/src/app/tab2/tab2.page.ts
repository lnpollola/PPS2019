import { Component } from "@angular/core";
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private nativeAudio: NativeAudio) {
    //ANIMALES
      //ES
      this.nativeAudio.preloadSimple('vaca', 'assets/sounds/vaca_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('burro', 'assets/sounds/burro_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('pato', 'assets/sounds/pato_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('elefante', 'assets/sounds/elefante_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('leon', 'assets/sounds/leon_ES.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      //EN
      this.nativeAudio.preloadSimple('vaca_EN', 'assets/sounds/vaca_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('burro_EN', 'assets/sounds/burro_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('pato_EN', 'assets/sounds/pato_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('elefante_EN', 'assets/sounds/elefante_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('leon_EN', 'assets/sounds/leon_EN.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
  
  }

  playVaca(){this.nativeAudio.play('vaca').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  playBurro(){this.nativeAudio.play('burro').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  playPato(){this.nativeAudio.play('pato').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  playElefante(){this.nativeAudio.play('elefante').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  playLeon(){this.nativeAudio.play('leon').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}

}
