import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {ColorPicker, SingleColorPicker} from "../color-picker";
import {Direction, Size, Point, Element} from "../element";
import {BarsPattern} from "../elements/bars-pattern";
import {CheckersPattern} from "../elements/checkers-pattern";
import {CircleElement} from "../elements/circle";
import {StripedSquare} from "../elements/striped-square";

export class PatternsExperiment extends Experiment {

  readonly BORDER: number = 1;
  patterns: Element[] = [];
  chance = new Chance();

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
    let toggle = this.chance.bool({ likelihood: 100 });
    let pattern = new BarsPattern(size, origin, colorPicker, direction, toggle);
    this.patterns.push(pattern);
  }

  addBarPatterns() {
    let toggle = this.chance.bool({ likelihood: 0 });
    if (toggle) {
      this.addBarPattern(Direction.horizontal);
    } else {
      this.addBarPattern(Direction.vertical);
    }
  }

  addCheckersPattern() {
    let size: Size = {
      width: this.canvas.pixelGrid.x - this.BORDER, 
      height: this.canvas.pixelGrid.y - this.BORDER
    };
    let origin: Point = {
      x: this.BORDER,
      y: this.BORDER 
    };
    let colorPicker = new SingleColorPicker(Pico8Pallete.darkGray);
    let toggle = this.chance.bool({ likelihood: 50 });
    let pattern = new CheckersPattern(size, origin, colorPicker, toggle);
    this.patterns.push(pattern);
  }

  addCircle(frame: Frame) {
    let centerPoint = frame.centerPoint();
    let colorPicker = new SingleColorPicker(Pico8Pallete.white);
    let circle = new CircleElement(40, centerPoint, colorPicker); 
    this.patterns.push(circle);
  }

  addStripedSquare() {
    let size: Size = {
      width: this.canvas.pixelGrid.x - this.BORDER, 
      height: this.canvas.pixelGrid.y - this.BORDER
    };
    let origin: Point = {
      x: this.BORDER,
      y: this.BORDER 
    };
    let colorPicker = new SingleColorPicker(Pico8Pallete.darkGray);
    let pattern = new StripedSquare(size, origin, colorPicker);
    this.patterns.push(pattern);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.white);

    this.patterns = [];

    // add our first pattern
    if (this.patterns.length == 0) {
      //this.addBarPatterns();
      //this.addCheckersPattern();
      //this.addCircle(frame);
      this.addStripedSquare();
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
 
