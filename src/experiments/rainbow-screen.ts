import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";

export class RainbowScreenExperiment extends Experiment {

  readonly colors = [
    Pico8Pallete.black,
    Pico8Pallete.red,
    Pico8Pallete.orange,
    Pico8Pallete.yellow,
    Pico8Pallete.green,
    Pico8Pallete.blue,
    Pico8Pallete.pink,
    Pico8Pallete.lightGray,
    Pico8Pallete.pink,
    Pico8Pallete.blue,
    Pico8Pallete.green,
    Pico8Pallete.yellow,
    Pico8Pallete.orange,
    Pico8Pallete.red,
    Pico8Pallete.darkGray,
    Pico8Pallete.black
  ];

  chance;

  constructor(canvas: Canvas) {
    super("rainbow-screen", canvas); 
    this.chance = new Chance();
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);

    let fullyFlipped = this.chance.bool({ likelihood: 5 });
   
    for (let x = 0; x < this.canvas.pixelGrid.x; x++) {
      let colorIndex = this.chance.integer({ min: 0, max: this.colors.length - 1 });   
      let flipped = fullyFlipped || this.chance.bool({ likelihood: 1 });

      for (let y = 0; y < this.canvas.pixelGrid.y; y++) {
        if (colorIndex >= this.colors.length) {
          colorIndex = 0;
        }

        let color = this.colors[colorIndex];
        if (!fullyFlipped) {
          frame.appendRect(y, x, 1, 1, color);
        }
        if (flipped) {
          frame.appendRect(x, y, 1, 1, color);
        }
        colorIndex++;
      }
    } 
 
    return frame;
  }
}
 
