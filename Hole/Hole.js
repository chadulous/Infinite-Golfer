/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hole extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Hole/costumes/costume1.svg", {
        x: 20.832315766381697,
        y: 20.832315766381754
      })
    ];

    this.sounds = [new Sound("pop", "./Hole/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ResetGoal" },
        this.whenIReceiveResetgoal
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.vars.loop = true;
    while (this.vars.loop) {
      if (this.touching(this.sprites["Golfball"])) {
        yield* this.broadcast("BallHasBeenSuckedIn");
      }
      yield;
    }
  }

  *whenIReceiveResetgoal() {
    this.goto(this.random(-232, 232), this.random(-172, 172));
    this.vars.loop = false;
    yield* this.whenGreenFlagClicked();
  }
}
