var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                this.showDebug = true;
                this.itemInterval = { min: 500, max: 800 };
                this.timer = this.game.time.create(false);
                this.roadMarkingTimer = this.game.time.create(false);
                this.scrollSpeed = 300;
                this.scooterMass = 10;
                this.debugBody = true;
                this.scrollMultiplier = 1;
                this.accelerateScooter = false;
            };
            Main.prototype.create = function () {
                this.stage.backgroundColor = 0xa6c9cb;
                this.roadMarkings = this.add.group();
                this.background = this.add.group();
                this.road = this.add.group();
                this.player = this.add.group();
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.setImpactEvents(true);
                this.game.physics.p2.restitution = 0;
                this.game.physics.p2.updateBoundsCollisionGroup();
                this.scooterCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.roadCollisionGroup = this.game.physics.p2.createCollisionGroup();
                this.road.enableBody = true;
                this.road.physicsBodyType = Phaser.Physics.P2JS;
                // this.scooter = this.player.create(this.game.width / 2, this.game.height - 200, 'motorcycle_yellow');
                this.scooter = new ShanghaiScooter.Prefab.Scooter(this.game, this.game.width / 2, this.game.height - 200);
                this.player.add(this.scooter);
                this.game.world.setBounds(0, -100, this.game.width, this.game.height + 600);
                this.scooter.body.collideWorldBounds = true;
                this.scooter.body.data.gravityScale = 0;
                this.scooter.body.debug = this.debugBody;
                this.scooter.body.fixedRotation = false;
                this.scooter.body.mass = this.scooterMass;
                this.scooter.body.setMaterial(this.scooterMaterial);
                this.scooter.body.setCollisionGroup(this.scooterCollisionGroup);
                this.scooter.body.collides([this.roadCollisionGroup]);
                this.rider = this.player.create(0, 0, 'racer_black');
                this.rider.scale.setTo(1);
                this.rider.anchor.setTo(0.5, 0.3);
                this.scooter.addChild(this.rider);
                this.carMaterial = this.game.physics.p2.createMaterial('carMaterial');
                this.scooterMaterial = this.game.physics.p2.createMaterial('scooterMaterial', this.scooter.body);
                this.carVsCarMaterial = this.game.physics.p2.createContactMaterial(this.carMaterial, this.carMaterial);
                this.carVsCarMaterial.restitution = 0.5;
                this.scooterVsCarMaterial = this.game.physics.p2.createContactMaterial(this.scooterMaterial, this.carMaterial);
                this.scooterVsCarMaterial.restitution = 0;
                this.scooter.body.onBeginContact.add(this.scooterHit, this);
                this.scooter.body.onEndContact.add(this.scooterHitData, this);
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
                this.roadMarkingTimer.add(8000, this.releaseMarking, this);
                this.roadMarkingTimer.start();
                // Background
                this.leftKerb = this.game.add.tileSprite(0, 0, 20, this.game.world.height, 'spritesheet_tiles', 'road_asphalt21.png', this.background);
                this.rightKerb = this.game.add.tileSprite(this.game.width, 0, -20, this.game.world.height, 'spritesheet_tiles', 'road_asphalt23.png', this.background);
                this.background.scale.setTo(1);
                _game = this.game;
                window.addEventListener("deviceorientation", this.handleOrientation, true);
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
                    if (Math.abs(x) > 10) {
                        _this.scooter.body.velocity.x += x * 2;
                    }
                    if (y < -0) {
                        _this.accelerateScooter = true;
                    }
                    else {
                        _this.accelerateScooter = false;
                    }
                    _this.hitKerb = false;
                }
            };
            Main.prototype.update = function () {
                if (this.accelerateScooter && !this.hitKerb) {
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
                    this.scrollSpeed = 300;
                    this.scrollMultiplier = 1;
                    this.scooter.body.velocity.y = 0;
                    this.road.forEachAlive(function (item) {
                        item.body.velocity.y = 250 * item.speedMultiplier;
                    }, this);
                    if (this.scooter.y < this.game.height - 200) {
                        this.scooter.body.velocity.y += 100;
                    }
                }
                if (this.scooter.body.angle !== 0) {
                    if (this.scooter.body.angle < 0) {
                        this.scooter.body.rotateRight(30);
                    }
                    else {
                        this.scooter.body.rotateLeft(30);
                    }
                }
                if (this.scooter.y > this.game.world.height - 200) {
                    this.scooter.body.velocity.y = 40;
                }
                else {
                }
                /*if (this.keys.left.isDown) {
                    this.scooter.body.velocity.x -= this.movementForce;
                }
                else if (this.keys.right.isDown) {
                    this.scooter.body.velocity.x += this.movementForce;
                }
                if (this.keys.up.isDown) {
                    this.scrollSpeed += 100;
    
                    scrollMultiplier = 2;
    
                    this.road.forEachAlive(function (item) {
                        item.body.velocity.y += 40 * item.speedMultiplier;
                    }, this);
                    if (this.scooter.y > this.game.height / 2) {
                        this.scooter.body.velocity.y -= this.movementForce * 1.5;
                    }
                }
                else if (this.keys.down.isDown) {
                    if (this.scooter.y < this.game.height - 200) {
                        this.road.forEachAlive(function (item) {
                            if (item.body.velocity.y > this.scrollSpeed) {
                                item.body.velocity.y -= 40 * item.speedMultiplier;
                            }
                        }, this);
                        this.scooter.body.velocity.y += this.movementForce * 1.5;
                    }
                }
    
    
                if (this.scooter.y < this.game.height - 200) {
                    this.road.forEachAlive(function (item) {
                        if (item.body.velocity.y > this.scrollSpeed) {
                            item.body.velocity.y -= 20 * item.speedMultiplier;
                        }
                    }, this);
                    this.scooter.body.velocity.y += this.scooter.deltaY;
                }*/
                this.background.forEach(function (tileSprite) {
                    tileSprite.tilePosition.y += (10 * this.scrollMultiplier);
                }, this);
                this.road.forEachAlive(function (item) {
                    if (item.position.y > this.game.height + 100) {
                        item.kill();
                    }
                    this.renderBody(item);
                    this.road.forEachAlive(function (_item) {
                        if (item.angleLineFront.intersects(_item.angleLineBack, true)) {
                            // car is in proximity
                            item.body.velocity.y = 0;
                        }
                    }, this);
                }, this);
                this.roadMarkings.forEachAlive(function (tileSprite) {
                    tileSprite.position.y += (10 * this.scrollMultiplier);
                    if (tileSprite.position.y > this.game.height + 100) {
                        tileSprite.kill();
                    }
                }, this);
            };
            Main.prototype.render = function () {
                if (this.showDebug) {
                    this.game.debug.text("Pool size: " + this.road.total, 0, 32);
                    this.game.debug.text("min: " + this.itemInterval.min + " max: " + this.itemInterval.max, 0, 52);
                    this.game.debug.text("scrollSpeed: " + this.scrollSpeed, 0, 72);
                }
            };
            Main.prototype.renderBody = function (sprite) {
                this.game.debug.geom(sprite.angleLineFront, '#FB1216');
                this.game.debug.geom(sprite.angleLineBack, '#FB1216');
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
                    item.body.rotation = 0;
                    item.loadTexture('spritesheet_vehicles', ShanghaiScooter.Prefab.Car.randomCarTexture(this.game));
                    item.body.velocity.y = this.game.rnd.integerInRange(this.scrollSpeed, this.scrollSpeed * 1.5) * item.speedMultiplier;
                }
                else {
                    item = new ShanghaiScooter.Prefab.Car(this.game, x, y, 'spritesheet_vehicles', ShanghaiScooter.Prefab.Car.randomCarTexture(this.game));
                    item.anchor.y = 1;
                    this.road.add(item);
                    item.body.debug = this.debugBody;
                    item.body.clearShapes();
                    item.body.loadPolygon('shanghaiShape', 'car_steer');
                    item.body.collideWorldBounds = true;
                    item.body.angle = (x > this.game.world.centerX) ? 180 : 0;
                    item.body.inertia = item.body.force = item.body.mass = this.scooterMass * 100;
                    item.body.velocity.y = this.game.rnd.integerInRange(this.scrollSpeed, this.scrollSpeed * 1.5) * item.speedMultiplier;
                    item.body.setMaterial('carMaterial');
                    item.body.setCollisionGroup(this.roadCollisionGroup);
                    item.body.collides([this.roadCollisionGroup, this.scooterCollisionGroup]);
                    item.body.onBeginContact.add(this.carHit, this);
                }
            };
            Main.prototype.scooterHit = function (body, bodyB, shapeA, shapeB, equation) {
                /*if(typeof window.navigator.vibrate === "function") {
                    window.navigator.vibrate(50);
                }*/
                //  The body hit something.
                //
                //  This callback is sent 5 arguments:
                //
                //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
                //  The p2.Body this Body is in contact with.
                //  The Shape from this body that caused the contact.
                //  The Shape from the contact body.
                //  The Contact Equation data array.
                //
                //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
                if (body) {
                    this.game.time.events.add(Phaser.Timer.SECOND, function () {
                        if (this.scooter.y > this.game.height) {
                            this.game.state.start('menu');
                        }
                    }, this);
                }
                else {
                    if (this.scooter.x < 100 || this.scooter.x > this.game.width - 100) {
                        console.log('You last hit: The Kerb');
                        this.hitKerb = true;
                    }
                    else {
                        this.hitKerb = false;
                    }
                }
            };
            Main.prototype.scooterHitData = function (body, bodyB, shapeA, shapeB, equation) {
                if (typeof this.scooter.body.data.velocity[0] !== "undefined" && typeof this.scooter.body.data.velocity[1] !== "undefined") {
                    console.log(this.scooter.body.data.velocity[0], this.scooter.body.data.velocity[1]);
                    for (var i in this.scooter.body.data.velocity) {
                        if (Math.abs(this.scooter.body.data.velocity[i]) > 10) {
                            this.game.state.start('menu');
                            return;
                        }
                    }
                }
            };
            Main.prototype.carHit = function (body, bodyB, shapeA, shapeB, equation) {
                if (!body) {
                    return;
                }
                else {
                    if (shapeA.body.parent.sprite._frame.name.indexOf('car_') < 0) {
                        body.damping = 1;
                    }
                }
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = ShanghaiScooter.State || (ShanghaiScooter.State = {}));
})(ShanghaiScooter || (ShanghaiScooter = {}));
//# sourceMappingURL=Main.js.map