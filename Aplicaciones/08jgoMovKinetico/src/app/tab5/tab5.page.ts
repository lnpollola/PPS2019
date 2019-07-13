/**
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';


declare let Phaser;

let that;
let game;
let player;
let aliens;
let bullets;
let bulletTime = 0;
let cursors;
let mobileCursors ={
  left: false,
  right: false,
  up: false,
  down: false
};
let fireButton;
let mobileFireButton = false;
let explosions;
let starfield;
let score = 0;
let scoreString = '';
let scoreText;
let lives;
let enemyBullets;
let firingTimer = 0;
let stateText;
let livingEnemies = [];

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
 
})
export class Tab5Page implements OnInit {

  public estadoTexto = false ; 

  constructor(private menuCtrl: MenuController) {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'space-invaders',
      { preload: this.preload, create: this.create, update: this.update,  render: this.render });

    that = Object.create(this.constructor.prototype);
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  ngOnInit() {

  }

  preload() {
    // game.load.image('bullet', 'assets/phaser/bullet.png');
    // game.load.image('enemyBullet', 'assets/phaser/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/phaser/invader32x32x4.png', 32, 32);
    game.load.image('ship', 'assets/personajes/marvel1.png');
    game.load.spritesheet('kaboom', 'assets/phaser/explode.png', 128, 128);
    game.load.image('starfield', 'assets/phaser/starfield.png');
    game.load.image('background', 'assets/phaser/background2.png');

  }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');

    //  The hero!
    player = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    
    

    //  The score
    scoreString = 'Record : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '24px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    // game.add.text(game.world.width - 100, 10, 'Vidas : ', { font: '24px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '34px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    

    // for (let i = 0; i < 3; i++) {
    //   let ship = lives.create(game.world.width - 100 + (30 * i), 60, 'invader');
    //   ship.anchor.setTo(0.5, 0.5);
    //   // ship.angle = 90;
    //   ship.alpha = 0.4;
    // }

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  }


  restart() {

    //  A new level starts

    // resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    // aliens.removeAll();
    // that.createAliens();

    // revives the player
    player.revive();
    // hides the text

    stateText.visible = false;
    this.estadoTexto = false;
    score = 0 ;
    scoreText.text = scoreString + score;
    this.create();

  }


  update() {
    //  Scroll the background
    starfield.tilePosition.y += 2;
    // if (player.alive) {
      //  Reset the player, then check for movement keys
      // player.body.velocity.setTo(0, 0);
      score += 1;
      scoreText.text = scoreString + score;
     console.log(player.getBounds());

      if (cursors.left.isDown || mobileCursors.left) {
        // player.body.velocity.x = -200;
        // player.body.velocity.setTo(-1000, 0);
        
        player.body.velocity.x -= 1500 ;
        // player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.left = false;

      } else if (cursors.right.isDown || mobileCursors.right) {
        // player.body.velocity.x = 200;
        // player.body.velocity.setTo(1000, 0);
        
        player.body.velocity.x += 1500 ;

        // player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.right = false;
      } else if ( mobileCursors.up) {
        // player.body.velocity.setTo(0, -1000);
        
        player.body.velocity.y -= 1500 ;
        // player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.up = false;

      } else if (mobileCursors.down) {
        // player.body.velocity.setTo(0, 1000);
        
        player.body.velocity.y += 1500 ;
        // player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.down = false;
      }

      // console.log("window height", window.innerHeight);
      // console.log("window widht", window.innerWidth);

      let varY = player.getBounds().y - (window.innerHeight - 158) ;
      // console.log("varY", varY);
      let varX = player.getBounds().x - (window.innerWidth - 158) ;
      // console.log("varX", varX);

      // if (player.body.velocity.y === 0 || player.body.velocity.x === 0 ) {
        if (  player.getBounds().y == 0  ||  (varY >= 0 && varY < 3 )  ) {

        console.log("Choco Arriba o abajo");
        player.body.velocity.setTo(0, 0);
        // game.restart();
        this.estadoTexto = true;
        stateText.text = " Perdiste \n ¿Otra vez?";
            stateText.visible = true;
           that.restart();
            // the "click to restart" handler
            // game.input.onTap.addOnce(that.restart, {x: 1});
            

       } else if (player.getBounds().x == 0 ||  (varX >= 0 && varX < 3 )   ) {
        console.log("Choco Costado");
        player.body.velocity.setTo(0, 0);
        // game.restart();
          this.estadoTexto = true;
        stateText.text = " Perdiste \n ¿Otra vez?";
            stateText.visible = true;
           that.restart();
       } else {
         console.log("esta en otro lado");
       }

  }

  render() {
    // for (let i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }
  }
  
  collisionHandler() {
    //  When a bullet hits an alien we kill them both
    console.log("colision con bordes");

  }



  fireBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
      //  Grab the first bullet we can from the pool
      let bullet = bullets.getFirstExists(false);

      if (bullet) {
        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
      }
    }

  }

  resetBullet(bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

  }


  fireStart(event){
    mobileFireButton = true
  }
  fireEnd(event){
    mobileFireButton = false;
  }
  leftStart(){
    mobileCursors.left = true;
  }
  arribaStart(){
    mobileCursors.up = true;
  }
  abajoStart(){
    mobileCursors.down = true;
  }
  rightStart() {
    mobileCursors.right = true;
  }

  leftEnd(event){
    mobileCursors.left = false;
  }

  rightEnd(event){
    mobileCursors.right = false;
  }

}






