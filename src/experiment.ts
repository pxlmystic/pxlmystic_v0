import {Canvas, Frame} from "./svg";

export class Experiment {
  name: string;
  canvas: Canvas;  

  constructor(name: string, canvas: Canvas) {
    this.name = name;
    this.canvas = canvas;
  }

  generateFrame(): Frame {
    return null;
  }
}

