import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Golfball from "./Golfball/Golfball.js";
import Hole from "./Hole/Hole.js";
import Putter from "./Putter/Putter.js";
import Level from "./Level/Level.js";
import Toggle from "./Toggle/Toggle.js";
import Mobilehitbutton from "./Mobilehitbutton/Mobilehitbutton.js";
import MobileCursor from "./MobileCursor/MobileCursor.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Golfball: new Golfball({
    x: 0,
    y: 0,
    direction: 0,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Hole: new Hole({
    x: -50,
    y: -35,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Putter: new Putter({
    x: 0,
    y: 0,
    direction: 0,
    costumeNumber: 1,
    size: 15,
    visible: true
  }),
  Level: new Level({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Toggle: new Toggle({
    x: 200,
    y: 140,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  Mobilehitbutton: new Mobilehitbutton({
    x: -188,
    y: -129,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  MobileCursor: new MobileCursor({
    x: 125,
    y: 1,
    direction: 0,
    costumeNumber: 1,
    size: 100,
    visible: true
  })
};

const project = new Project(stage, sprites);
export default project;
