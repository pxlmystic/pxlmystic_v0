import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";

export class RainbowLinesExperiment extends Experiment {

  readonly colors = [
    Pico8Pallete.white,
    Pico8Pallete.lightGray,
    Pico8Pallete.red,
    Pico8Pallete.orange,
    Pico8Pallete.yellow,
    Pico8Pallete.green,
    Pico8Pallete.blue,
    Pico8Pallete.pink,
    Pico8Pallete.blue,
    Pico8Pallete.green,
    Pico8Pallete.yellow,
    Pico8Pallete.orange,
    Pico8Pallete.red,
  ];

  chance;

  constructor(canvas: Canvas) {
    super("rainbow-lines", canvas); 
    this.chance = new Chance();
  }

  addRandomElement(frame: Frame, centerX: number, centerY: number) {
    let height = 1;
    let width = 1; 
    let extend = this.chance.bool({ likelihood: 60 });
    if (extend) {
      height = this.chance.weighted([1, 3], [99, 1]);
      width = this.chance.integer({ min: 2, max: 12 });
    }
    let xHorizontal = centerX - Math.floor(width / 2);
    let yVertical = centerY - Math.floor(height / 2); 
    let colorIndex = 0;
    if (extend) {
      colorIndex = this.chance.integer({ min: 1, max: this.colors.length - 1 });
    }
    let flipped = this.chance.bool({ likelihood: 40 });
    for (let i = xHorizontal; i < xHorizontal + width; i++) {
      if (colorIndex >= this.colors.length) {
        colorIndex = 0;
      }
      let color = this.colors[colorIndex];
      let x = flipped ? centerY : i;
      let y = flipped ? i : centerY;
      frame.appendRect(x, y, 1, height, color);
      colorIndex++;
    }
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.black);

    let totalElements = this.chance.integer({ min: 420, max: 555 });
    for (let i = 0; i < totalElements; i++) {
      let x = this.chance.integer({ min: 0, max: 64 });
      let y = this.chance.integer({ min: 0, max: 64 });
      this.addRandomElement(frame, x, y);
    }
 
    return frame;
  }
}
 
