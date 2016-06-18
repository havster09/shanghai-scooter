var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
                this.angleLineFront = new Phaser.Line();
                this.angleLineBack = new Phaser.Line();
                this.anchor.setTo(0.5, 0.5);
            }
            Car.prototype.update = function () {
                this.angleLineFront.fromAngle(this.x, this.y + this.height / 5, 1.57, this.height);
                this.angleLineBack.fromAngle(this.x - this.width / 2, this.y - this.height * 1.2, 0, this.width);
                if (this.shanghaiScooterDirection === "up") {
                }
                else {
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
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var Prefab;
    (function (Prefab) {
        var Scooternpc = (function (_super) {
            __extends(Scooternpc, _super);
            function Scooternpc(game, x, y, key, frame) {
                _super.call(this, game, x, y, key, frame);
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
            Scooternpc.prototype.update = function () {
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
            };
            Scooternpc.randomScooterTexture = function (game) {
                var scooterTexture = 'motorcycle_';
                var colorArr = ['black', 'green', 'red', 'blue', 'yellow'];
                scooterTexture += colorArr[game.rnd.between(0, 4)];
                scooterTexture += '.png';
                return scooterTexture;
            };
            Scooternpc.randomRiderTexture = function (game) {
                var riderTexture = 'racer_';
                var colorArr = ['black', 'green', 'red', 'blue', 'yellow'];
                riderTexture += colorArr[game.rnd.between(0, 4)];
                riderTexture += '.png';
                return riderTexture;
            };
            return Scooternpc;
        })(Phaser.Sprite);
        Prefab.Scooternpc = Scooternpc;
    })(Prefab = ShanghaiScooter.Prefab || (ShanghaiScooter.Prefab = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var Prefab;
    (function (Prefab) {
        var Pedestrian = (function (_super) {
            __extends(Pedestrian, _super);
            function Pedestrian(game, x, y, key, frame) {
                _super.call(this, game, x, y, key, frame);
                this.shanghaiScooterDirection = (x < game.world.width) ? "left" : "right";
                this.speedMultiplier = (this.shanghaiScooterDirection === "down") ? 3 : 1;
                this.scale.set(0.75);
            }
            Pedestrian.prototype.update = function () {
            };
            Pedestrian.randomPedestrianTexture = function (game) {
                var pedestrianTexture = 'character_';
                var hairArr = ['black_', 'blonde_', 'brown_'];
                var colorArr = ['white', 'green', 'red', 'blue'];
                pedestrianTexture += hairArr[game.rnd.between(0, 2)];
                pedestrianTexture += colorArr[game.rnd.between(0, 3)];
                pedestrianTexture += '.png';
                return pedestrianTexture;
            };
            return Pedestrian;
        })(Phaser.Sprite);
        Prefab.Pedestrian = Pedestrian;
    })(Prefab = ShanghaiScooter.Prefab || (ShanghaiScooter.Prefab = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
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
                this.angleLine = new Phaser.Line();
            }
            Scooter.prototype.update = function () {
                if (this.x > this.game.width / 2 && this.game.state.states.main.brave < 1000) {
                    // brave incoming traffic
                    this.game.state.states.main.brave += 1;
                    this.game.state.states.main.braveMeterFill.scale.setTo(this.game.state.states.main.brave / 1000 * 200, 14);
                }
                this.angleLine.fromAngle(this.x, this.y + this.height / 2, 1.57, this.height);
                /*this.game.state.states.main.road.forEachAlive(function(item) {
                    if(this.angleLine.intersects(item.angleLineBack,true)) {
                        // brave overtaking
                        this.game.state.states.main.brave += 1;
                        this.game.state.states.main.braveMeterFill.scale.setTo(this.game.state.states.main.brave/1000*200,14);
                    }
                },this);*/
            };
            return Scooter;
        })(Phaser.Sprite);
        Prefab.Scooter = Scooter;
    })(Prefab = ShanghaiScooter.Prefab || (ShanghaiScooter.Prefab = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;
                // Assign global settings here
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = ShanghaiScooter.State || (ShanghaiScooter.State = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
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
                this.load.image('orange_pixel', 'orange_pixel.png');
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
var _game;
var ShanghaiScooter;
(function (ShanghaiScooter) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
            }
            Main.prototype.init = function () {
                this.movementForce = 200;
                this.pauseKey = null;
                this.debugKey = null;
                this.itemInterval = { min: 200, max: 300 };
                this.timer = this.game.time.create(false);
                this.roadMarkingTimer = this.game.time.create(false);
                this.scrollSpeed = 300;
                this.showDebug = this.debugBody = false;
                this.scrollMultiplier = 1;
                this.accelerateScooter = false;
                this.brave = 0;
                this.playerHit = false;
            };
            Main.prototype.create = function () {
                this.game.time.advancedTiming = true;
                this.stage.backgroundColor = 0xa6c9cb;
                this.roadMarkings = this.add.group();
                this.background = this.add.group();
                this.pedestrians = this.add.group();
                this.road = this.add.group();
                this.player = this.add.group();
                this.userInterface = this.add.group();
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.pedestrians.enableBody = true;
                this.road.enableBody = true;
                this.scooter = new ShanghaiScooter.Prefab.Scooter(this.game, this.game.width / 2, this.game.height - 200);
                this.game.physics.enable(this.scooter, Phaser.Physics.ARCADE);
                this.scooter.body.collideWorldBounds = true;
                this.scooter.body.allowRotation = true;
                this.scooter.body.bounce.set(0.5);
                this.player.add(this.scooter);
                this.game.world.setBounds(0, -100, this.game.width, this.game.height + 600);
                this.rider = this.player.create(0, 0, 'racer_black');
                this.rider.scale.setTo(1);
                this.rider.anchor.setTo(0.5, 0);
                this.scooter.addChild(this.rider);
                var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
                this.title = this.game.add.text(0, 0, 'Shanghai Scooter', style);
                this.keys = this.game.input.keyboard.createCursorKeys();
                //  Press P to pause and resume the game
                this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
                this.pauseKey.onDown.add(this.togglePause, this);
                this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
                this.debugKey.onDown.add(this.toggleDebug, this);
                this.timer.add(this.itemInterval.max, this.releaseItem, this);
                this.timer.start();
                this.timer.add(this.itemInterval.max, this.releasePedestrian, this);
                this.timer.start();
                this.roadMarkingTimer.add(8000, this.releaseMarking, this);
                this.roadMarkingTimer.start();
                // Background
                this.leftKerb = this.game.add.tileSprite(0, 0, 20, this.game.world.height, 'spritesheet_tiles', 'road_asphalt21.png', this.background);
                this.rightKerb = this.game.add.tileSprite(this.game.width, 0, -20, this.game.world.height, 'spritesheet_tiles', 'road_asphalt23.png', this.background);
                this.game.physics.enable([this.leftKerb, this.rightKerb]);
                this.background.scale.setTo(1);
                _game = this.game;
                window.addEventListener("deviceorientation", this.handleOrientation, true);
                this.braveMeterFill = this.game.add.sprite(this.game.width - 250, this.game.height - 50, 'orange_pixel', this.userInterface);
                this.braveMeterContainer = this.game.add.graphics(this.game.width, this.game.height - 52, this.userInterface);
                // draw a rectangle
                this.braveMeterContainer.lineStyle(1, 0x000000, 1);
                this.braveMeterContainer.drawRect(-251, 1, 201, 16);
                this.braveMeterFill.anchor.setTo(0, 0);
                this.braveMeterFill.scale.setTo(0, 14);
            };
            Main.prototype.togglePause = function () {
                this.game.paused = !this.game.paused;
            };
            Main.prototype.toggleDebug = function () {
                this.showDebug = !this.showDebug;
            };
            Main.prototype.handleOrientation = function (event) {
                var x = event.gamma;
                var y = event.beta;
                var z = event.alpha;
                if (_game) {
                    var _this = _game.state.states.main;
                    _this.title.setText(event.alpha + "," + event.beta + "," + event.gamma);
                    if (Math.abs(x) > 0) {
                        _this.scooter.body.velocity.x += x * 3;
                    }
                    if (y < -0 && _this.brave > 0) {
                        _this.accelerateScooter = true;
                        _this.playerHit = false;
                    }
                    else {
                        _this.accelerateScooter = false;
                    }
                    _this.hitObstruction = false;
                }
            };
            Main.prototype.update = function () {
                if (this.accelerateScooter && !this.hitObstruction && this.brave > 0) {
                    this.brave -= 2;
                    this.braveMeterFill.scale.setTo(this.brave / 1000 * 200, 14);
                    this.scrollSpeed += 100;
                    this.scrollMultiplier = 2;
                    this.road.forEachAlive(function (item) {
                        item.body.velocity.y = 500 * item.speedMultiplier;
                    }, this);
                    if (this.scooter.y > 200) {
                        this.scooter.body.velocity.y -= 2;
                    }
                    else {
                        this.scooter.body.velocity.y = 0;
                    }
                }
                else {
                    this.accelerateScooter = false;
                    this.scrollSpeed = 300;
                    this.scrollMultiplier = 1;
                    if (this.scooter.y < this.game.height - 200) {
                        this.scooter.body.velocity.y += 2;
                    }
                    else if (this.scooter.y > this.game.height - 200 && this.scooter.body.velocity.y > 0 && !this.playerHit) {
                        this.scooter.body.velocity.y = 0;
                    }
                }
                if (this.scooter.y > this.game.world.height - 200) {
                    this.scooter.body.velocity.y = 40;
                }
                else {
                }
                this.background.forEach(function (tileSprite) {
                    tileSprite.tilePosition.y += (10 * this.scrollMultiplier);
                }, this);
                this.road.forEachAlive(function (item) {
                    if (item.position.y > this.game.height + 200) {
                        item.kill();
                    }
                    this.renderBody(item);
                }, this);
                this.renderScooterBody(this.scooter);
                this.pedestrians.forEachAlive(function (sprite) {
                    if (sprite.shanghaiScooterDirection === "left") {
                        sprite.body.velocity.x = 100;
                    }
                    else {
                        sprite.body.velocity.x = -100;
                    }
                    sprite.body.velocity.y = this.scrollSpeed + 300 * this.scrollMultiplier;
                }, this);
                this.roadMarkings.forEachAlive(function (tileSprite) {
                    tileSprite.position.y += (10 * this.scrollMultiplier);
                    if (tileSprite.position.y > this.game.height + 100) {
                        tileSprite.kill();
                    }
                }, this);
                if (this.scooter.x < 0 || this.scooter.x > this.game.width) {
                    this.game.state.start('menu');
                    return;
                }
                if (this.scooter.y > this.game.height + 100) {
                    this.game.state.start('menu');
                    return;
                }
                this.game.physics.arcade.collide(this.player, this.road, this.scooterHit, null, this);
                this.game.physics.arcade.collide(this.road, this.road);
            };
            Main.prototype.render = function () {
                if (this.showDebug) {
                    this.game.debug.text("" + this.game.time.fps, 2, 106, "#00ff00");
                    this.game.debug.text("Pool size: " + this.road.total, 0, 32);
                    this.game.debug.text("min: " + this.itemInterval.min + " max: " + this.itemInterval.max, 0, 52);
                    this.game.debug.text("scrollSpeed: " + this.scrollSpeed, 0, 72);
                    this.game.debug.text("brave: " + this.brave, 0, 92);
                }
            };
            Main.prototype.renderBody = function (sprite) {
                if (!this.showDebug) {
                    return;
                }
                // this.game.debug.geom(sprite.angleLineFront, '#FB1216');
                // this.game.debug.geom(sprite.angleLineBack, '#FB1216');
                this.game.debug.body(sprite);
            };
            Main.prototype.renderScooterBody = function (sprite) {
                // this.game.debug.geom(sprite.angleLine, '#FB1216');
            };
            Main.prototype.releaseMarking = function () {
                var item = this.roadMarkings.getFirstDead();
                if (item) {
                    item.reset();
                    item.position.y = -200;
                }
                else {
                    this.game.add.tileSprite(0, -200, this.game.width, 128, 'spritesheet_tiles', 'road_asphalt70.png', this.roadMarkings);
                }
                this.roadMarkingTimer.add(this.rnd.between(1000, 1000), this.releaseMarking, this);
            };
            Main.prototype.releasePedestrian = function () {
                var recycled_pedestrian = this.pedestrians.getFirstDead();
                this.releasePedestrianObstruction(recycled_pedestrian);
                this.timer.add(this.rnd.between(2000, 2000), this.releasePedestrian, this);
            };
            Main.prototype.releasePedestrianObstruction = function (item) {
                var x = this.rnd.between(-10, this.game.width + 10);
                var y = -100;
                if (item) {
                    item.reset(x, y);
                    item.loadTexture('spritesheet_characters', ShanghaiScooter.Prefab.Pedestrian.randomPedestrianTexture(this.game));
                }
                else {
                    item = new ShanghaiScooter.Prefab.Pedestrian(this.game, x, y, 'spritesheet_characters', ShanghaiScooter.Prefab.Pedestrian.randomPedestrianTexture(this.game));
                    item.anchor.y = 1;
                    this.pedestrians.add(item);
                    item.body.debug = this.debugBody;
                    item.body.collideWorldBounds = false;
                    item.angle = (item.shanghaiScooterDirection === "left") ? -90 : 90;
                }
            };
            Main.prototype.releaseItem = function () {
                var recycled_item = this.road.getFirstDead();
                this.releaseObstruction(recycled_item);
                this.timer.add(this.rnd.between(this.itemInterval.min, this.itemInterval.max), this.releaseItem, this);
            };
            Main.prototype.releaseObstruction = function (item) {
                var x = this.rnd.between(100, this.game.width - 100);
                var y = -150;
                if (item) {
                    item.reset(y);
                    item.x = x;
                    item.loadTexture('spritesheet_vehicles', (item.constructor.name === "Car") ? ShanghaiScooter.Prefab.Car.randomCarTexture(this.game) : ShanghaiScooter.Prefab.Scooternpc.randomScooterTexture(this.game));
                }
                else {
                    if (this.game.rnd.between(0, 2) < 1) {
                        item = new ShanghaiScooter.Prefab.Car(this.game, x, y, 'spritesheet_vehicles', ShanghaiScooter.Prefab.Car.randomCarTexture(this.game));
                    }
                    else {
                        item = new ShanghaiScooter.Prefab.Scooternpc(this.game, x, y, 'spritesheet_vehicles', ShanghaiScooter.Prefab.Scooternpc.randomScooterTexture(this.game));
                    }
                    this.road.add(item);
                }
                item.angle = (x > this.game.world.centerX) ? 180 : 0;
                item.shanghaiScooterDirection = (x < this.game.world.centerX) ? "up" : "down";
                item.speedMultiplier = (item.shanghaiScooterDirection === "down") ? 4 : 1;
                item.body.velocity.y = this.game.rnd.integerInRange(this.scrollSpeed, this.scrollSpeed * 1.5) * item.speedMultiplier;
                item.body.bounce.set(0.5);
            };
            Main.prototype.scooterHit = function (player, hitItem) {
                if (hitItem.body.touching.down) {
                    console.log(hitItem);
                    console.log('test');
                    this.playerHit = true;
                }
                // hitItem.kill();
                this.hitObstruction = true;
            };
            Main.prototype.scooterHitData = function (body, bodyB, shapeA, shapeB, equation) {
                if (!shapeB.body) {
                    return;
                }
                console.log(shapeB.body.velocity[0], shapeB.body.velocity[1]);
                for (var i in shapeB.body.velocity) {
                    if (Math.abs(shapeB.body.velocity[i]) > 40 || bodyB.x < 0 || bodyB.x > this.game.width) {
                        // this.game.state.start('menu');
                        return;
                    }
                }
            };
            Main.prototype.carHit = function (body, bodyB, shapeA, shapeB, equation) {
                if (!body) {
                    return;
                }
                else {
                    if (shapeA.body.parent.sprite._frame.name.indexOf('car_') < 0) {
                        body.damping = 0.5;
                    }
                }
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = ShanghaiScooter.State || (ShanghaiScooter.State = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path="Prefab/Car.ts"/>
/// <reference path="Prefab/Scooternpc.ts"/>
/// <reference path="Prefab/Pedestrian.ts"/>
/// <reference path="Prefab/Scooter.ts"/>
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
//# sourceMappingURL=main.js.map