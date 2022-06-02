/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop2", "./Level/costumes/backdrop2.svg", {
        x: 248.345265,
        y: 189.627105
      })
    ];

    this.sounds = [new Sound("Bird", "./Level/sounds/Bird.wav")];

    this.triggers = [];
  }
}
