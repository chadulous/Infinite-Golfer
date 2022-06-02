/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Putter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Putter", "./Putter/costumes/Putter.svg", {
        x: 110.47397285051613,
        y: 180.48169940031892
      })
    ];

    this.sounds = [new Sound("pop", "./Putter/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "GoHit" }, this.whenIReceiveGohit),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      )
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.stage.vars.mobile == 1) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Golfball"].y - this.y,
            this.sprites["Golfball"].x - this.x
          )
        );
        this.goto(
          this.sprites["MobileCursor"].x,
          this.sprites["MobileCursor"].y
        );
        if (this.stage.vars.canshoot == 1 && this.stage.vars.mousedist < 200) {
          this.effects.ghost = 0;
        } else {
          this.effects.ghost = 60;
        }
      } else {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Golfball"].y - this.y,
            this.sprites["Golfball"].x - this.x
          )
        );
        this.goto(this.mouse.x, this.mouse.y);
        if (this.stage.vars.canshoot == 1 && this.stage.vars.mousedist < 200) {
          this.effects.ghost = 0;
        } else {
          this.effects.ghost = 60;
        }
      }
      yield;
    }
  }

  *whenIReceiveGohit() {
    yield* this.glide(
      0.6,
      this.x + -50 * Math.cos(this.scratchToRad(this.direction)),
      this.y + -50 * Math.sin(this.scratchToRad(this.direction))
    );
    yield* this.glide(
      0.2,
      this.sprites["Golfball"].x,
      this.sprites["Golfball"].y
    );
  }

  *whenKeySpacePressed() {
    this.visible = false;
    yield* this.wait(1);
    this.visible = true;
  }
}
