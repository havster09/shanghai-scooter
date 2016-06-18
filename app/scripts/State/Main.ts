var _game;

module ShanghaiScooter.State {
    import Car = ShanghaiScooter.Prefab.Car;
    import Scooter = ShanghaiScooter.Prefab.Scooter;
    interface IItemInterval {
        min:number;
        max:number;
    }

    export class Main extends Phaser.State {
        scooter:Phaser.Sprite;
        orangePixel:Phaser.Sprite;
        scooterMass:number;
        rider:Phaser.Sprite;
        background:Phaser.Group;
        player:Phaser.Group;
        pedestrians:Phaser.Group;
        road:Phaser.Group;
        roadMarkings:Phaser.Group;
        userInterface:Phaser.Group;
        title:Phaser.Text;
        keys:Phaser.CursorKeys;
        movementForce:number;
        scrollSpeed:number;
        scrollMultiplier:number;
        accelerateScooter:boolean;

        pauseKey:Phaser.Key;
        debugKey:Phaser.Key;
        playerHit:boolean;
        showDebug:boolean;
        debugBody:boolean;

        timer:Phaser.Timer;
        roadMarkingTimer:Phaser.Timer;
        itemInterval:IItemInterval;



        asphalt:Phaser.TileSprite;
        leftKerb:Phaser.TileSprite;
        rightKerb:Phaser.TileSprite;
        crossing:Phaser.TileSprite;

        hitObstruction:boolean;
        brave:number;

        // ui
        braveMeterContainer:Phaser.Graphics;
        braveMeterFill:Phaser.Sprite;

        init() {
            this.movementForce = 200;
            this.pauseKey = null;
            this.debugKey = null;
            this.itemInterval = {min: 200, max: 300};
            this.timer = this.game.time.create(false);
            this.roadMarkingTimer = this.game.time.create(false);
            this.scrollSpeed = 300;
            this.showDebug = this.debugBody = false;

            this.scrollMultiplier = 1;
            this.accelerateScooter = false;
            this.brave = 0;
            this.playerHit = false;
        }

        create() {
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

            this.scooter = new ShanghaiScooter.Prefab.Scooter(this.game,this.game.width / 2, this.game.height - 200);
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

            let style = {font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
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

            this.game.physics.enable([ this.leftKerb,this.rightKerb ]);

            this.background.scale.setTo(1);
            _game = this.game;
            window.addEventListener("deviceorientation", this.handleOrientation,true);

            this.braveMeterFill = this.game.add.sprite(this.game.width-250,this.game.height-50,'orange_pixel',this.userInterface);
            this.braveMeterContainer = this.game.add.graphics(this.game.width,this.game.height-52,this.userInterface);

            // draw a rectangle
            this.braveMeterContainer.lineStyle(1, 0x000000, 1);
            this.braveMeterContainer.drawRect(-251, 1, 201, 16);

            this.braveMeterFill.anchor.setTo(0,0);
            this.braveMeterFill.scale.setTo(0,14);

        }

        togglePause() {
            this.game.paused = !this.game.paused;
        }

        toggleDebug() {
            this.showDebug = !this.showDebug;
        }

        handleOrientation(event) {
            let x = event.gamma;
            let y = event.beta;
            let z = event.alpha;

            if(_game) {
                const _this = _game.state.states.main;
                _this.title.setText(event.alpha +","+ event.beta+","+event.gamma);
                if(Math.abs(x) > 0) {
                    _this.scooter.body.velocity.x += x*3;
                }


                if(y < -0 && _this.brave > 0) {
                    _this.accelerateScooter = true;
                    _this.playerHit = false;
                }
                else {
                    _this.accelerateScooter = false;
                }
                _this.hitObstruction = false;

            }
        }

        update() {

            if(this.accelerateScooter && !this.hitObstruction && this.brave > 0) {
                this.brave-=2;
                this.braveMeterFill.scale.setTo(this.brave/1000*200,14);
                this.scrollSpeed += 100;
                this.scrollMultiplier = 2;

                this.road.forEachAlive(function (item) {
                    item.body.velocity.y = 500 * item.speedMultiplier;
                }, this);

                if(this.scooter.y > 200) {
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
                else if(this.scooter.y > this.game.height - 200 && this.scooter.body.velocity.y > 0 && !this.playerHit) {
                    this.scooter.body.velocity.y = 0;
                }
            }

            if (this.scooter.y > this.game.world.height-200) {
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

            this.pedestrians.forEachAlive(function(sprite) {
                if(sprite.shanghaiScooterDirection === "left") {
                    sprite.body.velocity.x = 100;
                }
                else {
                    sprite.body.velocity.x = -100;
                }
                sprite.body.velocity.y = this.scrollSpeed + 300 * this.scrollMultiplier;
            },this);

            this.roadMarkings.forEachAlive(function (tileSprite) {
                tileSprite.position.y += (10 * this.scrollMultiplier);
                if (tileSprite.position.y > this.game.height + 100) {
                    tileSprite.kill();
                }
            }, this);

            if(this.scooter.x < 0 || this.scooter.x > this.game.width) {
                this.game.state.start('menu');
                return;
            }

            if (this.scooter.y > this.game.height + 100) {
                this.game.state.start('menu');
                return;
            }

            this.game.physics.arcade.collide(this.player, this.road, this.scooterHit, null, this);
            this.game.physics.arcade.collide(this.road, this.road);
        }

        render() {
            if (this.showDebug) {
                this.game.debug.text(""+this.game.time.fps, 2, 106, "#00ff00");
                this.game.debug.text("Pool size: " + this.road.total, 0, 32);
                this.game.debug.text("min: " + this.itemInterval.min + " max: " + this.itemInterval.max, 0, 52);
                this.game.debug.text("scrollSpeed: " + this.scrollSpeed, 0, 72);
                this.game.debug.text("brave: " + this.brave, 0, 92);
            }



        }

        renderBody(sprite) {
            if (!this.showDebug) {
                return;
            }
            // this.game.debug.geom(sprite.angleLineFront, '#FB1216');
            // this.game.debug.geom(sprite.angleLineBack, '#FB1216');
            this.game.debug.body(sprite);
        }

        renderScooterBody(sprite) {
            // this.game.debug.geom(sprite.angleLine, '#FB1216');
        }

        releaseMarking() {
            var item = this.roadMarkings.getFirstDead();

            if (item) {
                item.reset();
                item.position.y = -200;
            }
            else {
                this.game.add.tileSprite(0, -200, this.game.width, 128, 'spritesheet_tiles', 'road_asphalt70.png', this.roadMarkings);
            }
            this.roadMarkingTimer.add(this.rnd.between(1000, 1000), this.releaseMarking, this);
        }

        releasePedestrian() {
            let recycled_pedestrian = this.pedestrians.getFirstDead();
            this.releasePedestrianObstruction(recycled_pedestrian);
            this.timer.add(this.rnd.between(2000, 2000), this.releasePedestrian, this);
        }

        releasePedestrianObstruction(item) {
            let x = this.rnd.between(-10,this.game.width + 10);
            let y = -100;
            if (item) {
                item.reset(x,y);
                item.loadTexture('spritesheet_characters', ShanghaiScooter.Prefab.Pedestrian.randomPedestrianTexture(this.game));
            }
            else {
                item = new ShanghaiScooter.Prefab.Pedestrian(this.game, x, y, 'spritesheet_characters', ShanghaiScooter.Prefab.Pedestrian.randomPedestrianTexture(this.game));

                item.anchor.y = 1;
                this.pedestrians.add(item);

                item.body.debug = this.debugBody;
                item.body.collideWorldBounds = false;
                item.angle = (item.shanghaiScooterDirection === "left")?-90:90;
            }
        }


        releaseItem() {
            let recycled_item = this.road.getFirstDead();
            this.releaseObstruction(recycled_item);
            this.timer.add(this.rnd.between(this.itemInterval.min, this.itemInterval.max), this.releaseItem, this);
        }

        releaseObstruction(item) {
            let x = this.rnd.between(100, this.game.width - 100);
            let y = -150;
            if (item) {
                item.reset(y);
                item.x = x;
                item.loadTexture('spritesheet_vehicles', (item.constructor.name === "Car")?ShanghaiScooter.Prefab.Car.randomCarTexture(this.game):ShanghaiScooter.Prefab.Scooternpc.randomScooterTexture(this.game));
            }
            else {
                if(this.game.rnd.between(0,2) < 1) {
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
        }

        scooterHit(player,hitItem) {
            if(hitItem.body.touching.down) {
                console.log(hitItem);
                console.log('test');
                this.playerHit = true;
            }
            // hitItem.kill();
            this.hitObstruction = true;
        }

        scooterHitData(body, bodyB, shapeA, shapeB, equation) {
            if(!shapeB.body) {
                return;
            }
            console.log(shapeB.body.velocity[0],shapeB.body.velocity[1]);
            for(let i in shapeB.body.velocity) {
                if(Math.abs(shapeB.body.velocity[i]) > 40 || bodyB.x < 0 || bodyB.x > this.game.width) {
                    // this.game.state.start('menu');
                    return;
                }
            }
        }

        carHit(body, bodyB, shapeA, shapeB, equation) {
            if (!body) {
                return;
            }
            else {
                if (shapeA.body.parent.sprite._frame.name.indexOf('car_') < 0) {
                    body.damping = 0.5;
                }
            }

        }
    }
}