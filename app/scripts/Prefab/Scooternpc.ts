module ShanghaiScooter.Prefab {
    interface IScooterNpc {
        shanghaiScooterDirection:string;
        speedMultiplier:number;
        rider:Phaser.Sprite;
    }
    export class Scooternpc extends Phaser.Sprite implements IScooterNpc {
        shanghaiScooterDirection;
        speedMultiplier;
        rider;

        constructor(game:Phaser.Game, x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number) {
            super(game, x, y, key, frame);
            // Set prefab properties here
            this.scale.setTo(0.75);
            this.anchor.setTo(0.5);

            this.rider = game.add.sprite(0, 0, 'spritesheet_characters', ShanghaiScooter.Prefab.Scooternpc.randomRiderTexture(game));
            game.physics.arcade.enable(this.rider);
            this.rider.body.kinematic = true;
            this.rider.scale.setTo(1);
            this.rider.anchor.setTo(0.5, 0.3);
            this.addChild(this.rider);
        }

        update() {
            if (this.body.velocity.x > 45) {
                this.body.velocity.x = this.deltaX;
            }
            else if (this.body.velocity.x < -45) {
                this.body.velocity.x = Math.abs(this.deltaX);
            }
            if (this.shanghaiScooterDirection === "up") {

            }
            else {

            }
        }

        static randomScooterTexture(game:Phaser.Game) {
            let scooterTexture:string = 'motorcycle_';
            let colorArr:string[] = ['black', 'green', 'red', 'blue', 'yellow'];
            scooterTexture += colorArr[game.rnd.between(0, 4)];
            scooterTexture += '.png';
            return scooterTexture;
        }

        static randomRiderTexture(game:Phaser.Game) {
            let riderTexture:string = 'racer_';
            let colorArr:string[] = ['black', 'green', 'red', 'blue', 'yellow'];
            riderTexture += colorArr[game.rnd.between(0, 4)];
            riderTexture += '.png';
            return riderTexture;
        }
    }
}
