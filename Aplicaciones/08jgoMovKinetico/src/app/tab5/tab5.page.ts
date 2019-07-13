/**
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { Component } from '@angular/core';
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
export class Tab5Page {

  constructor(private menuCtrl: MenuController) {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'space-invaders',
      { preload: this.preload, create: this.create, update: this.update,  render: this.render });

    that = Object.create(this.constructor.prototype);
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  preload() {
    game.load.image('bullet', 'assets/phaser/bullet.png');
    game.load.image('enemyBullet', 'assets/phaser/enemy-bullet.png');
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
    

    // player.setCollideWorldBounds(true);
    // player.onWorldBounds = true;

    //  The baddies!
    // aliens = game.add.group();
    // aliens.enableBody = true;
    // aliens.physicsBodyType = Phaser.Physics.ARCADE;

    // that.createAliens();

    //  The score
    scoreString = 'Record : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '24px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Vidas : ', { font: '24px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '34px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (let i = 0; i < 3; i++) {
      let ship = lives.create(game.world.width - 100 + (30 * i), 60, 'invader');
      ship.anchor.setTo(0.5, 0.5);
      ship.angle = 90;
      ship.alpha = 0.4;
    }

    // //  An explosion pool
    // explosions = game.add.group();
    // explosions.createMultiple(30, 'kaboom');
    // explosions.forEach(that.setupInvader, this);

    //  And some controls to play the game with
    // Useful if your game is web-based, where player can use a keyboard
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  }

  // createAliens() {

  //   for (let y = 0; y < 4; y++) {
  //     for (let x = 0; x < 8; x++) {
  //       let alien = aliens.create(x * ((window.innerWidth - 100) / 8), y * 50, 'invader');
  //       alien.anchor.setTo(0.5, 0.5);
  //       alien.animations.add('fly', [0, 1, 2, 3], 20, true);
  //       alien.play('fly');
  //       alien.body.moves = false;
  //     }
  //   }

  //   aliens.x = 10;
  //   aliens.y = 50;

  //   //  All this does is basically start the invaders moving. 
  //   // Notice we're moving the Group they belong to, rather than the invaders directly.
  //   let tween = game.add.tween(aliens).to({ x: 90 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  //   //  When the tween loops it calls descend
  //   tween.onLoop.add(that.descend, this);
  // }

  // setupInvader(invader) {

  //   invader.anchor.x = 0.5;
  //   invader.anchor.y = 0.5;
  //   invader.animations.add('kaboom');

  // }

  // descend() {
  //   aliens.y += 10;
  // }

  update() {
    //  Scroll the background
    starfield.tilePosition.y += 2;
    // if (player.alive) {
      //  Reset the player, then check for movement keys
      // player.body.velocity.setTo(0, 0);
     

      if (cursors.left.isDown || mobileCursors.left) {
        // player.body.velocity.x = -200;
        // player.body.velocity.setTo(-1000, 0);
        
        player.body.velocity.x -= 1500 ;
        player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.left = false;
      } else if (cursors.right.isDown || mobileCursors.right) {
        // player.body.velocity.x = 200;
        // player.body.velocity.setTo(1000, 0);
        
        player.body.velocity.x += 1500 ;

        player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.right = false;
      } else if ( mobileCursors.up) {
        // player.body.velocity.setTo(0, -1000);
        
        player.body.velocity.y -= 1500 ;
        player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.up = false;

      } else if (mobileCursors.down) {
        // player.body.velocity.setTo(0, 1000);
        
        player.body.velocity.y += 1500 ;
        player.body.bounce.set(1);
        player.body.onWorldBounds = new Phaser.Signal();
        mobileCursors.down = false;
      }

      // if (player.body.velocity.y === 0 || player.body.velocity.x === 0 ) {
        if (  player.getBounds().y == 0) {

        console.log("Choco Arriba");
        player.body.velocity.setTo(0, 0);
       } else if (player.getBounds().x == 0) {
        console.log("Choco Costado Izq");
        player.body.velocity.setTo(0, 0);
       } else {
         console.log("esta en otro lado");
       }
      //  Firing?
      // if (fireButton.isDown || mobileFireButton) {
      //   that.fireBullet();
      // }
      // if (game.time.now > firingTimer) {
      //   that.enemyFires();
      // }
      //  Run collision
      // game.physics.arcade.overlap(bullets, aliens, that.collisionHandler, null, this);
      
      // game.physics.arcade.overlap(player, game.schene.physics.world.bounds , that.collisionHandler, null, this);
      
      
      // face.body.velocity.setTo(200, 200);
      // face.body.bounce.set(1);
      
      // face.body.collideWorldBounds = true;
  
      // //  By default the Signal is empty, so we create it here:
      // face.body.onWorldBounds = new Phaser.Signal();
  
      // //  And then listen for it
      // face.body.onWorldBounds.add(hitWorldBounds, this);
      // game.physics.arcade.overlap(enemyBullets, player, that.enemyHitsPlayer, null, this);
    
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

  // collisionHandler(bullet, alien) {
  //   //  When a bullet hits an alien we kill them both
  //   bullet.kill();
  //   alien.kill();
  //   //  Increase the score
  //   score += 20;
  //   scoreText.text = scoreString + score;
  //   //  And create an explosion :)
  //   let explosion = explosions.getFirstExists(false);
  //   explosion.reset(alien.body.x, alien.body.y);
  //   explosion.play('kaboom', 30, false, true);
  //   if (aliens.countLiving() === 0) {
  //     score += 1000;
  //     scoreText.text = scoreString + score;
  //     enemyBullets.callAll('kill', this);
  //     stateText.text = " You Won, \n Click to restart";
  //     stateText.visible = true;
  //     // the "click to restart" handler
  //     game.input.onTap.addOnce(that.restart, this);
  //   }

  // }

  enemyHitsPlayer(player, bullet) {
    bullet.kill();
    let live = lives.getFirstAlive();
    if (live) {
      live.kill();
    }
    //  And create an explosion :)
    let explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);
    // When the player dies
    if (lives.countLiving() < 1) {
      player.kill();
      enemyBullets.callAll('kill');
      stateText.text = " GAME OVER \n Click to restart";
      stateText.visible = true;
      //the "click to restart" handler
      game.input.onTap.addOnce(that.restart, this);
    }

  }

  enemyFires() {

    //  Grab the first bullet we can from the pool
    let enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    aliens.forEachAlive(function (alien) {

      // put every living enemy in an array
      livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0) {

      let random = game.rnd.integerInRange(0, livingEnemies.length - 1);

      // randomly select one of them
      let shooter = livingEnemies[random];
      // And fire the bullet from this enemy
      enemyBullet.reset(shooter.body.x, shooter.body.y);

      game.physics.arcade.moveToObject(enemyBullet, player, 120);
      firingTimer = game.time.now + 2000;
    }

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

  restart() {

    //  A new level starts

    // resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    that.createAliens();

    // revives the player
    player.revive();
    // hides the text
    stateText.visible = false;

  }

  fireStart(event){
    mobileFireButton = true
  }
  fireEnd(event){
    mobileFireButton = false;
  }
  // leftStart(event){
  //   mobileCursors.left = true;
  // }
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
  // rightStart(event){
  //   mobileCursors.right = true;
  // }
  rightEnd(event){
    mobileCursors.right = false;
  }

}






