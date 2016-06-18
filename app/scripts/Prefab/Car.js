var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var Prefab;
    (function (Prefab) {
        var Car = (function (_super) {
            __extends(Car, _super);
            function Car(game, x, y, key, frame) {
                _super.call(this, game, x, y, key, frame);
                // Set prefab properties here
                this.shanghaiScooterDirection = (x < game.world.centerX) ? "up" : "down";
                this.speedMultiplier = (this.shanghaiScooterDirection === "down") ? 3 : 1;
                this.angleLineFront = new Phaser.Line();
                this.angleLineBack = new Phaser.Line();
                // this.proximityRectangle = new Phaser.Rectangle(0,0,this.width,this.height*1.5);
            }
            Car.prototype.update = function () {
                this.angleLineFront.fromAngle(this.x, this.y + this.height / 2, 1.57, this.height);
                this.angleLineBack.fromAngle(this.x - this.width / 2, this.y - this.height * 1.2, 0, this.width);
                if (this.body.velocity.x > 45) {
                    this.body.moveLeft(this.deltaX);
                }
                else if (this.body.velocity.x < -45) {
                    this.body.moveRight(Math.abs(this.deltaX));
                }
                if (this.shanghaiScooterDirection === "up") {
                    if (Math.abs(this.body.angle) !== 0) {
                        if (this.body.angle < 0) {
                            this.body.rotateRight(10);
                        }
                        else {
                            this.body.rotateLeft(20);
                        }
                    }
                }
                else {
                    if (Math.abs(this.body.angle) !== 180) {
                        if (this.body.angle > 0) {
                            this.body.rotateRight(10);
                        }
                        else {
                            this.body.rotateLeft(20);
                        }
                    }
                }
            };
            Car.randomCarTexture = function (game) {
                var carTexture = 'car_';
                var colorArr = ['black_', 'green_', 'red_', 'blue_', 'yellow_'];
                carTexture += colorArr[game.rnd.between(0, 4)];
                carTexture += '' + game.rnd.between(1, 5) + '.png';
                return carTexture;
            };
            return Car;
        })(Phaser.Sprite);
        Prefab.Car = Car;
    })(Prefab = ShanghaiScooter.Prefab || (ShanghaiScooter.Prefab = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
//# sourceMappingURL=Car.js.map