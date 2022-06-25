import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {ColorPicker} from "../color-picker";
import {Direction, Size, Point, Element} from "../element";
import {BarsPattern} from "../elements/bars-pattern";

export class PatternsExperiment extends Experiment {

  readonly BORDER: number = 4;
  patterns: Element[] = [];

  constructor(canvas: Canvas) {
    super("patterns", canvas, 1); 
  }

  addBarPattern(direction: Direction) {
    let size: Size = {
      width: this.canvas.pixelGrid.x - this.BORDER, 
      height: this.canvas.pixelGrid.y - this.BORDER
    };
    let origin: Point = {
      x: this.BORDER,
      y: this.BORDER 
    };
    let pattern = new BarsPattern(size, origin, direction);
    this.patterns.push(pattern);
  }

  addBarPatterns() {
    this.addBarPattern(Direction.horizontal);
    this.addBarPattern(Direction.vertical);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.white);

    // add our first pattern
    if (this.patterns.length == 0) {
      this.addBarPatterns();
    }

    // render the patterns
    for (var pattern of this.patterns) {
      pattern.tick();
      let points = pattern.getPoints();
      for (var point of points) {
        frame.appendPixel(point.x, point.y, Pico8Pallete.darkGray);
      }
    } 

    return frame;
  }
}
 
