import {Canvas, Frame} from "./svg";

export class Experiment {
  name: string;
  canvas: Canvas;
  totalFrames: number = 24;  
  frameRate: string = "1x8";  

  constructor(name: string, canvas: Canvas, totalFrames?: number, frameRate?: string) {
    this.name = name;
    this.canvas = canvas;
    this.totalFrames = totalFrames ? totalFrames : this.totalFrames;
    this.frameRate = frameRate ? frameRate : this.frameRate;
  }

  generateFrame(): Frame {
    return null;
  }
}

