module ShanghaiScooter.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        init() {
            this.input.maxPointers = 1;
            this.scale.pageAlignHorizontally = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        preload() {
            this.load.path = 'assets/images/';
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('motorcycle_yellow','motorcycle_yellow.png');
            this.load.image('racer_black','racer_black.png');
            this.load.image('orange_pixel','orange_pixel.png');

            this.load.atlasXML('spritesheet_vehicles', 'spritesheet_vehicles.png', 'spritesheet_vehicles.xml');
            this.load.atlasXML('spritesheet_characters', 'spritesheet_characters.png', 'spritesheet_characters.xml');
            this.load.atlasXML('spritesheet_tiles', 'spritesheet_tiles.png', 'spritesheet_tiles.xml');

            this.load.path = 'assets/physics/';
            this.load.physics('shanghaiShape', 'shanghaiShape.json');
        }

        create() {
            this.game.state.start('menu');
        }
    }
}