import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {ColorPicker, SingleColorPicker} from "../color-picker";
import {Direction, Size, Point, Element} from "../element";
import {BarsPattern} from "../elements/bars-pattern";
import {CircleElement} from "../elements/circle";

export class PatternsExperiment extends Experiment {

  readonly BORDER: number = 4;
  patterns: Element[] = [];

  constructor(canvas: Canvas) {
    super("patterns", canvas, 10); 
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
    let colorPicker = new SingleColorPicker(Pico8Pallete.darkGray);
    let pattern = new BarsPattern(size, origin, colorPicker, direction);
    this.patterns.push(pattern);
  }

  addBarPatterns() {
    this.addBarPattern(Direction.horizontal);
    this.addBarPattern(Direction.vertical);
  }

  addCircle(frame: Frame) {
    let centerPoint = frame.centerPoint();
    let colorPicker = new SingleColorPicker(Pico8Pallete.white);
    let circle = new CircleElement(20, centerPoint, colorPicker); 
    this.patterns.push(circle);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.white);

    // add our first pattern
    if (this.patterns.length == 0) {
      this.addBarPatterns();
      this.addCircle(frame);
    }

    // render the patterns
    for (var pattern of this.patterns) {
      pattern.tick();
      let points = pattern.getPoints();
      for (var point of points) {
        frame.appendPixel(point.x, point.y, point.color);
      }
    } 

    return frame;
  }
}
 
