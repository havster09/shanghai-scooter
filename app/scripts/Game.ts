/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path="Prefab/Car.ts"/>
/// <reference path="Prefab/Scooternpc.ts"/>
/// <reference path="Prefab/Pedestrian.ts"/>
/// <reference path="Prefab/Scooter.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>

module ShanghaiScooter {
  export class Game extends Phaser.Game {
    constructor() {
      super(640, 960, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new ShanghaiScooter.Game();
};