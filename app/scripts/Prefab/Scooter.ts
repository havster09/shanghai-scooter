module ShanghaiScooter.Prefab {
    interface IScooter {
        angleLine:Phaser.Line;
    }
    export class Scooter extends Phaser.Sprite implements IScooter {
        angleLine;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'motorcycle_yellow');

            // Set prefab properties here
            this.scale.setTo(1);
            this.anchor.setTo(0.5, 0.3);
            this.angleLine = new Phaser.Line();
        }

        update() {
            if(this.x > this.game.width/2 && this.game.state.states.main.brave < 1000) {
                // brave incoming traffic
                this.game.state.states.main.brave += 1;
                this.game.state.states.main.braveMeterFill.scale.setTo(this.game.state.states.main.brave/1000*200,14);
            }

            this.angleLine.fromAngle(this.x,this.y+this.height/2,1.57,this.height);

            /*this.game.state.states.main.road.forEachAlive(function(item) {
                if(this.angleLine.intersects(item.angleLineBack,true)) {
                    // brave overtaking
                    this.game.state.states.main.brave += 1;
                    this.game.state.states.main.braveMeterFill.scale.setTo(this.game.state.states.main.brave/1000*200,14);
                }
            },this);*/

        }
    }
}
