/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Mobilehitbutton extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume(
        "HitButtonSprite",
        "./Mobilehitbutton/costumes/HitButtonSprite.svg",
        {x: 35, y: 35}
      )
    ]

    this.sounds = [new Sound("Meow", "./Mobilehitbutton/sounds/Meow.wav")]

    this.triggers = [new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)]

    this.vars.lastmousex = 0
    this.vars.lastmousey = 0
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.stage.vars.mobile == 1) {
        this.visible = true
        this.effects.ghost = 25
        while (!(this.stage.vars.mobile == 0)) {
          if (
            this.stage.vars.mobilemousedown == 0 &&
            !(this.vars.lastmousex == this.mouse.x) &&
            !(this.vars.lastmousey == this.mouse.y)
          ) {
            this.stage.vars.mobilemousedown =
              Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y) < 32
                ? 1
                : 0
          } else {
            this.stage.vars.mobilemousedown = 0
          }
          yield ((this.vars.lastmousey = this.mouse.y),
          (this.vars.lastmousex = this.mouse.x))
          yield
        }
      } else {
        this.effects.ghost = 0
        this.visible = false
      }
      yield
    }
  }
}
