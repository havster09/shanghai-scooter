/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path="Prefab/Car.ts"/>
/// <reference path="Prefab/Scooter.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 640, 960, Phaser.AUTO, 'game-div');
            this.state.add('boot', ShanghaiScooter.State.Boot);
            this.state.add('preload', ShanghaiScooter.State.Preload);
            this.state.add('menu', ShanghaiScooter.State.Menu);
            this.state.add('main', ShanghaiScooter.State.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    ShanghaiScooter.Game = Game;
})(ShanghaiScooter || (ShanghaiScooter = {}));
window.onload = function () {
    var game = new ShanghaiScooter.Game();
};
//# sourceMappingURL=Game.js.map