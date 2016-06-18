var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var Prefab;
    (function (Prefab) {
        var Scooter = (function (_super) {
            __extends(Scooter, _super);
            function Scooter(game, x, y) {
                _super.call(this, game, x, y, 'motorcycle_yellow');
                // Set prefab properties here
                this.scale.setTo(1);
                this.anchor.setTo(0.5, 0.3);
                this.game.physics.p2.enable(this, false, true);
                this.body.clearShapes();
                this.body.loadPolygon('shanghaiShape', 'scooter_steer');
            }
            Scooter.prototype.update = function () {
                // Update prefab here
            };
            return Scooter;
        })(Phaser.Sprite);
        Prefab.Scooter = Scooter;
    })(Prefab = ShanghaiScooter.Prefab || (ShanghaiScooter.Prefab = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
//# sourceMappingURL=Scooter.js.map