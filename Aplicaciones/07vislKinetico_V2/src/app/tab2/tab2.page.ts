import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { ToastController,NavParams } from "@ionic/angular";


import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit
{
  
  @ViewChild('slideWithNav') slideWithNav: IonSlides;

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any;
  public accX:any;
  public accY:any;
  public accZ:any;


  public activar: boolean = true;
  public subscription;
  public estado;

  someTextUrl;
  selectedPhoto;
  loading;
  imagen : any;
  imagenes: [] = [];
  // imgInfo: Array<string>;
  imagenesLindas : any;
  imagenesTodas : any;
  imagenesFeas : any;
  spinner:boolean ; 

 isenabled: boolean= false;
 cardColor: string;

   
 listaRecorreAux: any;
 hayLista: any; 
 usuarioLogueado: any; 

 
 galleryType = 'pinterest';
 imagenActual;

 options: GyroscopeOptions = {
  frequency: 1000
};


imagenMuestro: string;
listaImagenes: any;
slideOpts = {
  initialSlide: 0,
  speed: 200,
  slidesPerView: 1
  // autoplay:true
};

slideEspecifico: number = 0;


  constructor(public navCtrl: NavController,
              public baseService: FirebaseService,
              private gyroscope: Gyroscope,
              private deviceMotion: DeviceMotion,
              public toastController: ToastController
              ) {
                this.Accelerometer();
                // this.spinner = true;
                // this.traerImagenesTodas();
                // this.traerImagenesLindas();
                // this.traerImagenesFeas();
                // setTimeout(() => this.spinner = false , 3000);

               }
  // galleryType = 'pinterest';


  ngOnInit() {
    // this.traerImagenesTodas();
    
    this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
    this.traerImagenesLindas();
    this.Accelerometer();
    // this.traerProductosPerfil();
    // this.traerPedidosActivosPorPerfil();
  }


// REFRESHER 

activoWatch() {
  this.gyroscope.watch()
 .subscribe((orientation: GyroscopeOrientation) => {
    console.log("Orientación Watch: ", orientation.x, orientation.y, orientation.z, orientation.timestamp);
 });
}


ionRefresh(event) {
  // console.log('Pull Event Triggered!');
  setTimeout(() => {
    // console.log('Async operation has ended');

    // complete()  signify that the refreshing has completed and to close the refresher
    event.target.complete();
    // this.pedidosMostrarFil = [];
    // this.listIdPedidosAceptados = null ;
    // this.listProductos  = [];
    // this.traerImagenesTodas();
    this.traerImagenesLindas();
  }, 2000);
  }
  ionPull(event) {
    // Emitted while the user is pulling down the content and exposing the refresher.
    // console.log('ionPull Event Triggered!');
   
  }
  ionStart(event) {
    // Emitted when the user begins to start pulling down.
    // console.log('ionStart Event Triggered!');
    // this.pedidosMostrarBarFil = [];
    // this.listIdPedidosAceptadosBar = null ;
    // this.listProductosBar  = [];
    // this.traerPedidosPerfilBar();
  }





  async traerImagenesTodas() {

    this.spinner  = true; 

    await this.baseService.getItems('cosasEdificio').then(async ped => {
      // this.imagenesLindas = ped;
      this.imagenesTodas = ped;



      for (let i = 0; i < this.imagenesTodas.length; i++) {
        const element = this.imagenesTodas[i];
        if(this.imagenesTodas[i].tipo == "LINDAS")
        {

          this.cardColor = "success";
          console.log(this.imagenesTodas[i].tipo);
        }
        else{

          this.cardColor = "danger";
          console.log(this.imagenesTodas[i].tipo);

  
        }
        
        
      }
    });  

    if (this.imagenesTodas.length == 0) {
      this.hayLista = false;
    } else {
      this.hayLista = true;
    }

    setTimeout(() => {
      this.spinner = false;
    }, 3000);

  }

  async traerImagenesLindas() {
    this.spinner  = true; 
    await this.baseService.getItems('cosasEdificio').then(ped => {
     this.imagenesLindas = ped;
     this.imagenesLindas = this.imagenesLindas.filter(imagen => imagen.tipo == "LINDAS");
   
   });  

   if (this.imagenesLindas.length == 0) {
    this.hayLista = false;
  } else {
    this.hayLista = true;

  }
  
  for (let i = 0; i < this.imagenesLindas.length; i++) {
    const element = this.imagenesLindas[i];
    
    // console.log(this.imagenesLindas[i]);

    this.imagenActual = this.imagenesLindas[i].url;
    // console.log("imagen actual", this.imagenActual);
    
}

  setTimeout(() => {
    this.spinner = false;
  }, 1000);

 }

 traerImagenesFeas() {

   this.baseService.getItems('cosasEdificio').then(ped => {
    this.imagenesFeas = ped;
    this.imagenesFeas = this.imagenesFeas.filter(imagen => imagen.tipo == "FEAS");
  
  });  

  if (this.imagenesFeas.length == 0) {
    this.hayLista = false;
  } else {
    this.hayLista = true;
  }

  setTimeout(() => {
    this.spinner = false;
  }, 3000);

}


   async like(nombreFile: any){
  //  alert(nombreFile);

   await this.baseService.getItems('cosasEdificio').then(async lista => {

    let imagenElegida = lista.find(imagen => imagen.nombreFile == nombreFile);
    let likes : number = parseInt(imagenElegida.likes)+1;
    let objetoVotos = imagenElegida.votacion;
    

    switch (this.usuarioLogueado.correo) {
      case 'admin@gmail.com':
            objetoVotos.votaAdmin = true; 
        break;
        case 'invitado@gmail.com':
            //  objetoVotos = {
            //   "votaInvitado": true,  
            // }
            objetoVotos.votaInvitado = true; 
          break;
          case 'usuario@gmail.com':
              // objetoVotos = {
              //   "votaUsuario": true,  
              // }
              objetoVotos.votaUsuario = true; 
            break;
            case 'anonimo@gmail.com':
                // objetoVotos = {
                //   "votaAnonimo": true,  
                // }
                objetoVotos.votaAnonimo = true; 
              break;
              case 'tester@gmail.com':
                  // objetoVotos = {
                  //   "votaTester": true,  
                  // }
                  objetoVotos.votaTester = true; 
                break;
    
      default:
        break;
    }

    // console.log(likes);
     let objetoEnviar = {
        // "correo": imagenElegida.correo,
        // "fechaElegida": imagenElegida.fechaElegida,
        // "nombreFile": imagenElegida.nombreFile,
        // "url":imagenElegida.url,
        // "tipo": imagenElegida.tipo,
        "votacion": objetoVotos,
        "likes": likes
      }

    this.baseService.updateItem('cosasEdificio', imagenElegida.key, objetoEnviar);  

    this.traerImagenesTodas();
   });

  }


  desactivoAcelerometro()
  {
    this.subscription.unsubscribe();
    this.activar = !this.activar;
  }


  Accelerometer(){
    this.activar=false;
    var flag = true;
    // var flagIzq =  true;
    // var flagDer = true;

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
   
    //  (error: any) => console.log(error)
 
    );






    this.subscription = this.deviceMotion.watchAcceleration({frequency:1500}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log("esta es el watch: ",acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
      let tap;
      this.slideEspecifico;


      //VERTICAL
      if( this.accY >= 9 ) {
         console.log("Está parado"); 
         this.estado="PARADO";
       
        //  setTimeout(function() {this.luzFlash.switchOff();}, 3000);

      
     
        }

      //HORIZONTAL
      // else if ( this.accZ >= 9) { 
      //   console.log("Está horizontal"); 
      //   this.estado="ACOSTADO";
      //   // timer(3000).subscribe(() => {
      //     // if(this.accY > 3){
            
      //     //YO LE AGREGO ESTA FUNCION, ES LA EXTRA QUE PIDE
      //       this.slideWithNav.slideTo(0);
         
      //     // }
      
      //   // });
      // }

      //IZQ
      else if ( this.accX >= 9) { 
        console.log("Está de costado IZQ"); 
        this.estado="IZQUIERDA";

        this.slideWithNav.slidePrev(500).then(() => {
          //this.checkIfNavDisabled(object, slideView);
        });
        // this.slideWithNav.slideTo(this.slideEspecifico-1);
      
      }
 
      //DER
      else if ( this.accX <= -9) {
         console.log("Está de costado DER"); 
         this.estado="DERECHA";
         this.slideWithNav.slideNext(500).then(() => {
          //this.checkIfNavDisabled(object, slideView);
        });
        // this.slideWithNav.slideTo(this.slideEspecifico+1);
        }

      //RESTO
      else {
        console.log("-----Registro de Watch------ ");
    
      
      }
    });
    
  }
   
  Frenar(){
    this.subscription.unsubscribe();
    this.activar = true;
  }

}
