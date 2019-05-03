import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page 
{

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;
  public activar:boolean = true;
  public subscription;

  constructor(
    private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion) {

   
  }

  activoAcelerometro()
  {
    // this.gyrascope();
    this.Accelerometer();
    this.activar = !this.activar;
  }

  desactivoAcelerometro()
  {
    this.subscription.unsubscribe();
    this.activar = !this.activar;
  }

  // gyrascope(){

  //   let options: GyroscopeOptions = {
  //     frequency: 1000
  //  };
   
  //  this.gyroscope.getCurrent(options)
  //    .then((orientation: GyroscopeOrientation) => {
  //       console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
  //       this.xOrient=orientation.x;
  //       this.yOrient=orientation.y;
  //       this.zOrient=orientation.z;
  //       this.timestamp=orientation.timestamp;

  //     })
  //    .catch()
   
   
  //  this.gyroscope.watch()
  //     .subscribe((orientation: GyroscopeOrientation) => {
  //        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
  //        this.xOrient=orientation.x;
  //       this.yOrient=orientation.y;
  //       this.zOrient=orientation.z;
  //       this.timestamp=orientation.timestamp;
  //     });
  // }

  Accelerometer(){
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
   
    //  (error: any) => console.log(error)
 
    );

    
    // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration({frequency:1000}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
    });
    
  }
 
}
