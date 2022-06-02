/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Golfball extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Golfball/costumes/costume1.svg", {
        x: 24.693790000000092,
        y: 24.693790000000007
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BallHasBeenSuckedIn" },
        this.whenIReceiveBallhasbeensuckedin
      )
    ];

    this.vars.xVelocity = 0;
    this.vars.yVelocity = 0;
    this.vars.md = 0;
    this.vars.hasbeensuckedin = 1;
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.stage.vars.score = 0;
    this.vars.hasbeensuckedin = 0;
    this.vars.xVelocity = 0;
    this.vars.yVelocity = 0;
    this.stage.vars.canshoot = 1;
    this.size = 100;
    this.goto(0, 0);
    while (true) {
      yield* this.calculatePhysics();
      yield;
    }
  }

  *calculatePhysics() {
    if (this.stage.vars.mobile == 1) {
      this.stage.vars.mousedist = Math.hypot(
        this.sprites["MobileCursor"].x - this.x,
        this.sprites["MobileCursor"].y - this.y
      );
      this.stage.vars.ballX = this.x;
      this.stage.vars.ballY = this.y;
      if (!(this.stage.vars.mobilemousedown == 1)) {
        this.vars.md = 0;
      }
      if (
        this.stage.vars.mobilemousedown == 1 &&
        this.stage.vars.mousedist < 200
      ) {
        this.vars.xVelocity =
          ((this.sprites["MobileCursor"].x - this.x) / 10) * -1;
        this.vars.yVelocity =
          ((this.sprites["MobileCursor"].y - this.y) / 10) * -1;
        this.vars.md = 1;
        yield* this.broadcastAndWait("GoHit");
        while (
          !(
            ((this.vars.xVelocity == 0 ||
              (this.vars.xVelocity < 0.1 && this.vars.xVelocity > -0.1)) &&
              (this.vars.yVelocity == 0 ||
                (this.vars.yVelocity < 0.1 && this.vars.yVelocity > -0.1))) ||
            this.vars.hasbeensuckedin == 1
          )
        ) {
          this.stage.vars.canshoot = 0;
          yield* this.movingandcollision();
          yield;
        }
        this.vars.xVelocity = 0;
        this.vars.yVelocity = 0;
        this.stage.vars.canshoot = 1;
      }
    } else {
      this.stage.vars.mousedist = Math.hypot(
        this.mouse.x - this.x,
        this.mouse.y - this.y
      );
      this.stage.vars.ballX = this.x;
      this.stage.vars.ballY = this.y;
      if (!this.mouse.down) {
        this.vars.md = 0;
      }
      if (
        this.mouse.down &&
        this.vars.md == 0 &&
        this.stage.vars.mousedist < 200
      ) {
        this.vars.xVelocity = ((this.mouse.x - this.x) / 10) * -1;
        this.vars.yVelocity = ((this.mouse.y - this.y) / 10) * -1;
        this.vars.md = 1;
        yield* this.broadcastAndWait("GoHit");
        while (
          !(
            ((this.vars.xVelocity == 0 ||
              (this.vars.xVelocity < 0.1 && this.vars.xVelocity > -0.1)) &&
              (this.vars.yVelocity == 0 ||
                (this.vars.yVelocity < 0.1 && this.vars.yVelocity > -0.1))) ||
            this.vars.hasbeensuckedin == 1
          )
        ) {
          this.stage.vars.canshoot = 0;
          yield* this.movingandcollision();
          yield;
        }
        this.vars.xVelocity = 0;
        this.vars.yVelocity = 0;
        this.stage.vars.canshoot = 1;
      }
    }
  }

  *movingandcollision() {
    this.vars.xVelocity = this.vars.xVelocity * 0.95;
    this.vars.yVelocity = this.vars.yVelocity * 0.95;
    this.direction += this.vars.xVelocity;
    this.x += this.vars.xVelocity;
    this.y += this.vars.yVelocity;
    this.createClone();
    if (this.touching(this.sprites["Level"].andClones())) {
      for (let i = 0; i < Math.ceil(Math.abs(this.vars.xVelocity)); i++) {
        if (this.touching(this.sprites["Level"].andClones())) {
          this.x += (Math.abs(this.vars.xVelocity) / this.vars.xVelocity) * -1;
        }
      }
      this.vars.xVelocity = this.vars.xVelocity * -1;
      if (this.touching(this.sprites["Level"].andClones())) {
        for (let i = 0; i < Math.ceil(Math.abs(this.vars.yVelocity)); i++) {
          if (this.touching(this.sprites["Level"].andClones())) {
            this.y +=
              (Math.abs(this.vars.yVelocity) / this.vars.yVelocity) * -1;
          }
        }
        this.vars.yVelocity = this.vars.yVelocity * -1;
        this.vars.xVelocity = this.vars.xVelocity * -1;
      }
    }
  }

  *startAsClone() {
    for (let i = 0; i < 100; i++) {
      this.effects.ghost += 5;
      this.size += 0.5;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveBallhasbeensuckedin() {
    this.vars.hasbeensuckedin = 1;
    this.stage.vars.canshoot = 0;
    for (let i = 0; i < 85; i++) {
      this.goto(this.sprites["Hole"].x, this.sprites["Hole"].y);
      this.stage.vars.canshoot = 0;
      this.direction += 15;
      this.size += -1;
      yield;
    }
    this.visible = false;
    yield* this.wait(1);
    this.visible = true;
    this.vars.hasbeensuckedin = 0;
    this.vars.xVelocity = 0;
    this.vars.yVelocity = 0;
    this.stage.vars.canshoot = 1;
    this.size = 100;
    this.goto(0, 0);
    this.broadcast("ResetGoal");
    this.stage.vars.score += 1;
  }
}
