/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 239.34526558891457,
        y: 180.62711301448792
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.canshoot = 0;
    this.vars.ballX = 0;
    this.vars.ballY = 0;
    this.vars.run = 0;
    this.vars.mousedist = 357.8155949647807;
    this.vars.mobile = 0;
    this.vars.mobilemousedown = 0;
    this.vars.score = 0;
    this.vars.mobilecursortargetx = 125;
    this.vars.mobilecursortargety = 1;
  }

  // *whenstageclicked() {
  //   if (this.vars.mobile == 1) {
  //     this.vars.mobilecursortargetx = this.mouse.x;
  //     this.vars.mobilecursortargety = this.mouse.y;
  //   }
  // }
}
