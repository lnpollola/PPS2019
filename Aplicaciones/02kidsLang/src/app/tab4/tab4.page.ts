import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page  {

  constructor(private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('vaca', 'assets/sounds/cow.mp3').then((success)=>{
      console.log("success");
    },(error)=>{
      console.log(error);
    });
  }
  
    playVaca(){
      this.nativeAudio.play('vaca').then((success)=>{
        console.log("success playing");
      },(error)=>{
        console.log(error);
      });
    }

}
