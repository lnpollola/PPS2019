import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // private saldoPantalla: string;
  public active;

  
  saldoPantalla: number;

  datosEscaneados: any;
  parsedDatosEscaneados: any;
  cargaCreditoBase: any;
  cargaAux: number;
  cargaTotal: number;
  cargaDiez: any = 0 ;
  cargaCincuenta: any = 0;
  cargaCien: any = 0;
  

  constructor(public toastController: ToastController,
              public router: Router,
              private scanner: BarcodeScanner,
              private baseService: FirebaseService)
              {
                // this.active = "table";
                
                this.levantarCreditoDB();
              }

              escaneoQR() {
                let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
       
          

                  this.scanner.scan().then((data) => {
                    this.datosEscaneados = data;

                    console.log(this.datosEscaneados);
  
                    this.baseService.getItems('cargaCredito').then(cargas => {
  
                      if(this.datosEscaneados.text == "8c95def646b6127282ed50454b73240300dccabc")
                      {
                        this.cargaAux = 10;
                        this.cargaDiez = 10;
  
                      }
                      if(this.datosEscaneados.text == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" ||
                      this.datosEscaneados.text == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ")
                      {
                        this.cargaAux = 50;
                        this.cargaCincuenta = 50;
                      }
                      if(this.datosEscaneados.text == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
                      {
                        this.cargaAux = 100;
                        this.cargaCien = 100;
                      }
                   
                      // let tieneCredito = cargas.find(client => client.usuario == usuarioLogueado.correo);                  
                      this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);
                      
                      if(this.cargaCreditoBase == undefined)
                      {
  
  
                        let objetoEnviar = {
                          "codigo": this.datosEscaneados.text,
                          "usuario": usuarioLogueado.correo,
                          "carga": this.cargaAux,
                          "cargaTotal": this.cargaAux
            
                        }
      
                        this.baseService.addItem('cargaCredito', objetoEnviar);
  
                        this.levantarCreditoDB();
  
                        this.creoToast(true);
  
                      }
                      else{
                        // if(this.cargaCreditoBase.codigo != this.datosEscaneados.text)
                        if(cargas.find(client =>client.codigo == this.datosEscaneados.text) == undefined)
  
                        {
                          this.cargaTotal = parseInt(this.cargaCreditoBase.cargaTotal) + this.cargaAux;
  
                          let objetoEnviarOtraCarga = {
                            "codigo": this.datosEscaneados.text,
                            "usuario": usuarioLogueado.correo,
                            "carga": this.cargaAux,
                            "cargaTotal": this.cargaTotal
              
                          }
                          let objetoEnviar = {
                           
                            "cargaTotal": this.cargaTotal
              
                          }
                          this.baseService.addItem('cargaCredito', objetoEnviarOtraCarga);  
                          this.baseService.updateItem('cargaCredito', this.cargaCreditoBase.key, objetoEnviar);  
    
    
                          this.levantarCreditoDB();
    
                        this.creoToast(true);
                      
    
                          
                        }
                        else{
                        this.creoToast(false);
                   
                        }
                      }
                
                    });

                  }, (err) => {
                    console.log("Error: " + err);
                  });
                }
  
  
  
  
                levantarCreditoDB(){
                  this.baseService.getItems('cargaCredito').then(cargas => {
                    let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
                    this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);
  
                    if(this.cargaCreditoBase == undefined)
                    {
                      this.saldoPantalla = 0.00;
                    }
                    else{

                      
                      this.saldoPantalla = parseInt(this.cargaCreditoBase.cargaTotal);
                  
                        if( this.cargaCreditoBase.cargaTotal == 10 
                          )
                        {
                          this.cargaDiez = 10;
                        }
                        else if (  this.cargaCreditoBase.cargaTotal == 50 
                          )
                        {

                          this.cargaCincuenta = 50;
                        }
                        else if (  this.cargaCreditoBase.cargaTotal == 60 
                          )
                        {

                          this.cargaCincuenta = 50;
                          this.cargaDiez = 10;
                        }
                        else if (  this.cargaCreditoBase.cargaTotal == 100 
                          )
                        {

                          this.cargaCien = 100;
                        }
                        else if (  this.cargaCreditoBase.cargaTotal == 110 
                          )
                        {

                          this.cargaCien = 100;
                          this.cargaDiez = 10;
                        }
                        else if (  this.cargaCreditoBase.cargaTotal == 150 
                          )
                        {

                          this.cargaCien = 100;
                          this.cargaCincuenta = 50;
                        }
                        else if  (this.cargaCreditoBase.cargaTotal == 160 
                         )
                        {
                          
                          this.cargaCien = 100;
                          this.cargaCincuenta = 50;
                          this.cargaDiez = 10;
                        }
                 
                    }
  
                    
                    });
                }     
  
                borroQR(){
                  this.baseService.getItems('cargaCredito').then(cargas => {
                    let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
                    this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);
  
                    for (let i = 0; i < cargas.length; i++) {
                      if(cargas[i].usuario == usuarioLogueado.correo)
                      {
                        this.baseService.removeItem('cargaCredito', cargas[i].key );
                      }
                      
                    }
                    this.cargaDiez = 0;
                    this.cargaCincuenta = 0;
                    this.cargaCien = 0;
                    this.creoToastBorro();
  
                 
                    this.levantarCreditoDB();
                    });
  
                }
  
                async creoToast(rta: boolean) {
  
                  if(rta == true)
                  {
                    const toast = await this.toastController.create({
                      message: 'Se acredito el credito correspondiente.',
                      color: 'success',
                      showCloseButton: false,
                      position: 'top',
                      duration: 2000 
                    });
                
                    toast.present();
              
              
                  }
                  else{
                    const toast = await this.toastController.create({
                      message: 'Error, QR ya utilizado',
                      color: 'danger',
                      showCloseButton: false,
                      position: 'top',
                      duration: 2000 
                    });
                
                    toast.present();
              
                  }
                }


                async creoToastBorro() {
  
                    const toast = await this.toastController.create({
                      message: 'Datos Eliminados',
                      color: 'danger',
                      showCloseButton: false,
                      position: 'top',
                      duration: 2000 
                    });
                
                    toast.present();
              
                  
                }




              async logoff(){


                const toast = await this.toastController.create({
                  message: 'Sesion Finalizada.',
                  color: 'dark',
                  showCloseButton: false,
                  position: 'top',
                  closeButtonText: 'Done',
                  duration: 2000 
                });
            
                toast.present();
            
                this.router.navigateByUrl('/login'); 
            
              }
}