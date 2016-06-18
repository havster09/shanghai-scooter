module ShanghaiScooter.Prefab {
    interface ICar {
        shanghaiScooterDirection:string;
        speedMultiplier:number;
        angleLineFront:Phaser.Line;
        angleLineBack:Phaser.Line;
    }
    export class Car extends Phaser.Sprite implements ICar {
        shanghaiScooterDirection;
        speedMultiplier;
        angleLineFront;
        angleLineBack;

        constructor(game:Phaser.Game, x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number) {
            super(game, x, y, key, frame);

            // Set prefab properties here
            this.angleLineFront = new Phaser.Line();
            this.angleLineBack = new Phaser.Line();
            this.anchor.setTo(0.5,0.5);
        }

        update() {
            this.angleLineFront.fromAngle(this.x,this.y+this.height/5,1.57,this.height);
            this.angleLineBack.fromAngle(this.x - this.width/2,this.y-this.height*1.2,0,this.width);

            if (this.shanghaiScooterDirection === "up") {

            }
            else {

            }
        }

        static randomCarTexture(game:Phaser.Game) {
            let carTexture:string = 'car_';
            let colorArr:string[] = ['black_','green_','red_','blue_','yellow_'];
            carTexture += colorArr[game.rnd.between(0,4)];
            carTexture += ''+game.rnd.between(1,5) + '.png';
            return carTexture;
        }

    }
}
