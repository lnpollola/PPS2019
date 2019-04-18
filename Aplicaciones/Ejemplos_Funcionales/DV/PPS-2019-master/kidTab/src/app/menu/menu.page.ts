import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  animales = '../../assets/Animales.PNG';
  colores = '../../assets/Colores.PNG';

  constructor() { }

  ngOnInit() {
  }

}
