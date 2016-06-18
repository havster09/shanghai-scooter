var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.init = function () {
                this.input.maxPointers = 1;
                this.scale.pageAlignHorizontally = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            };
            Preload.prototype.preload = function () {
                this.load.path = 'assets/images/';
                this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
                this.load.setPreloadSprite(this.preloadBar);
                this.load.image('motorcycle_yellow', 'motorcycle_yellow.png');
                this.load.image('racer_black', 'racer_black.png');
                this.load.atlasXML('spritesheet_vehicles', 'spritesheet_vehicles.png', 'spritesheet_vehicles.xml');
                this.load.atlasXML('spritesheet_characters', 'spritesheet_characters.png', 'spritesheet_characters.xml');
                this.load.atlasXML('spritesheet_tiles', 'spritesheet_tiles.png', 'spritesheet_tiles.xml');
                this.load.path = 'assets/physics/';
                this.load.physics('shanghaiShape', 'shanghaiShape.json');
            };
            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = ShanghaiScooter.State || (ShanghaiScooter.State = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
//# sourceMappingURL=Preload.js.map