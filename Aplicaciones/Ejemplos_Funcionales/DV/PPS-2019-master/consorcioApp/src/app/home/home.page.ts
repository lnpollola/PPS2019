import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { ListaUsuarios } from '../../app/enviroment'; 
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  clave: string;

  usuarios : any;

  ref = firebase.database().ref('usuarios/');

  public formGroup: FormGroup;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder){
    
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({    
      email: ['', [Validators.email, Validators.required]],
      clave: ['', [Validators.required]]
    });
  }

  async loginToast(validado:boolean) {
    
    if(validado){
      const toast = await this.toastController.create({
        message: 'Bienvenido Usuario',
        showCloseButton: true,
        position: 'top',
        closeButtonText: 'Aceptar',
        duration: 3000
      });
      toast.present();
    }
    else{
      const toast = await this.toastController.create({
        message: 'Clave o Usuario Incorrecto',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Aceptar',
        duration: 3000
      });
      toast.present();
    }  
  }
  
  enviar(){  
    let flagLogin = false;

    this.ref.on('value', resp => {    
      
      this.usuarios = ListaUsuarios(resp);      
      
      for(let usuario of this.usuarios){
        if(usuario.email == this.formGroup.value.email && usuario.clave == this.formGroup.value.clave){
          flagLogin = true;
          this.loginToast(flagLogin);            
          break;
        }
      }      
      
      if(!flagLogin){
        this.loginToast(flagLogin);   
      }  
    });

  }
}
