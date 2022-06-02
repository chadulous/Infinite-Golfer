/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Toggle extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("squircle", "./Toggle/costumes/squircle.svg", {
        x: 19.782790786913466,
        y: 18.090502137649594
      }),
      new Costume("squircle2", "./Toggle/costumes/squircle2.svg", {
        x: 19.782790786913466,
        y: 18.090502137649594
      })
    ];

    this.sounds = [new Sound("pop", "./Toggle/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.Greenflag)
    ];
  }

  *Greenflag() {
    this.costumeNumber = 1;
  }

  *whenthisspriteclicked() {
    this.costumeNumber += 1;
    this.stage.vars.mobile = this.costumeNumber - 1;
  }
}
