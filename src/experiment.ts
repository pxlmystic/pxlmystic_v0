import {Canvas, Frame} from "./svg";

export class Experiment {
  name: string;
  canvas: Canvas;
  totalFrames: number = 24;  

  constructor(name: string, canvas: Canvas, totalFrames?: number) {
    this.name = name;
    this.canvas = canvas;
    this.totalFrames = totalFrames ? totalFrames : this.totalFrames;
  }

  generateFrame(): Frame {
    return null;
  }
}

