import { Component } from "@angular/core";
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
