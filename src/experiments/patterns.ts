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
import {FilledRect} from "../elements/filled-rect";

export class Rect {
  size: Size;
  origin: Point;
  
  constructor(size: Size, origin: Point) {
    this.size = size;
    this.origin = origin;
  }

  containsPoint(point: Point): boolean {
    return point.x >= this.origin.x && point.x <= this.origin.x + this.size.width &&
             point.y >= this.origin.y && point.y <= this.origin.y + this.size.height;
  }
}

export class PatternsExperiment extends Experiment {

  readonly BORDER: number = 4;
  readonly MARGIN: number = 2;
  patterns: Element[] = [];
  windows: Rect[] = [];
  chance = new Chance();

  constructor(canvas: Canvas) {
    super("patterns", canvas, 24, "1x4"); 
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

  addFilledRect(color: string) {
    let size: Size = {
      width: this.canvas.pixelGrid.x - this.BORDER, 
      height: this.canvas.pixelGrid.y - this.BORDER
    };
    let origin: Point = {
      x: this.BORDER,
      y: this.BORDER 
    };
    let colorPicker = new SingleColorPicker(color);
    let pattern = new FilledRect(size, origin, colorPicker);
    this.patterns.push(pattern);
  }

  addFilledRects() {
   this.addFilledRect(Pico8Pallete.darkGray);
   this.addFilledRect(Pico8Pallete.white);
  }

  generateWindows(rows: number, columns: number,  margin: number): Rect[] {
    let windows = [];

    let windowSize: Size = {
      width: Math.floor((this.canvas.pixelGrid.x - this.BORDER * 2 - (margin * (columns - 1))) / columns),
      height: Math.floor((this.canvas.pixelGrid.y - this.BORDER * 2 - (margin * (rows - 1))) / rows)
    }

    for (var row = 0; row < rows; row++) {
      for (var column = 0; column < columns; column ++) {

        let origin: Point = {
          x: this.BORDER + (row * (windowSize.width + margin)),
          y: this.BORDER + (column * (windowSize.height + margin))
        };

        let rect = new Rect(windowSize, origin);
        windows.push(rect);
      }
    }

    return windows;
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.white);

    // add our first pattern
    if (this.patterns.length == 0) {
      this.addBarPatterns();
      this.addCheckersPattern();
      this.addStripedSquare();
      //this.addFilledRects();
    }

    if (true || this.windows.length == 0) {
      let rows = this.chance.integer({ min: 1, max: 6 });
      let columns = rows;
      this.windows = this.generateWindows(rows, columns, 2);
    }

    // render the windows
    for (var i = 0; i < this.windows.length; i++) {
      let randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
      var pattern = this.patterns[randomPatternIndex];
      let rect = this.windows[i];

      pattern.tick();
      let points = pattern.getPoints();
      for (var point of points) {
        if (rect.containsPoint(point)) {
          frame.appendPixel(point.x, point.y, point.color);
        }
      }
    } 

    return frame;
  }
}
 
