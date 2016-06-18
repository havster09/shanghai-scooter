var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.init = function () {
                this.stage.backgroundColor = 0x000000;
            };
            Menu.prototype.create = function () {
                var _this = this;
                var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
                this.title = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Shanghai Scooter', style);
                this.title.anchor.setTo(0.5);
                this.instructions = this.game.add.text(this.game.width / 2, this.game.height / 2 + 30, 'Tap to play', style);
                this.instructions.anchor.setTo(0.5);
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = ShanghaiScooter.State || (ShanghaiScooter.State = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
//# sourceMappingURL=Menu.js.map