module ShanghaiScooter.Prefab {
  interface IPedestrian {
    shanghaiScooterDirection:string;
    speedMultiplier:number;
  }
  export class Pedestrian extends Phaser.Sprite {
    shanghaiScooterDirection;
    speedMultiplier;
    constructor(game:Phaser.Game, x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number) {
      super(game, x, y, key, frame);
      this.shanghaiScooterDirection = (x < game.world.width) ? "left" : "right";
      this.speedMultiplier = (this.shanghaiScooterDirection === "down") ? 3 : 1;
      this.scale.set(0.75);
    }

    update() {

    }

    static randomPedestrianTexture(game:Phaser.Game) {
      let pedestrianTexture:string = 'character_';
      let hairArr:string[] = ['black_','blonde_','brown_'];
      let colorArr:string[] = ['white','green','red','blue'];
      pedestrianTexture += hairArr[game.rnd.between(0,2)];
      pedestrianTexture += colorArr[game.rnd.between(0,3)];
      pedestrianTexture += '.png';
      return pedestrianTexture;
    }
  }
}
