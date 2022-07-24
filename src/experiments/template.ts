import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";

export class MultilineExperiment extends Experiment {

  constructor(canvas: Canvas) {
    super("multiline", canvas, 10, "1x8");
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    return frame;
  } 
}

