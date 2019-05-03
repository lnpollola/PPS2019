import { Component } from "@angular/core";
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{

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
