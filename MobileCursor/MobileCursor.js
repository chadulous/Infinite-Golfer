/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MobileCursor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MobileCursor/costumes/costume1.svg", {
        x: 9.058584067773609,
        y: 11.633724999999998
      })
    ];

    this.sounds = [new Sound("pop", "./MobileCursor/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    while (true) {
      if (this.stage.vars.mobile == 1) {
        this.visible = true;
        if (
          Math.hypot(
            this.mouse.x - this.sprites.Mobilehitbutton.x,
            this.mouse.y - this.sprites.Mobilehitbutton.y
          ) > 32
        ) {
          this.goto(this.mouse.x, this.mouse.y);
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
