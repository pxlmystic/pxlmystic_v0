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
import {Shape, Hexagon, Rect, Circle, RightTriangle, LeftEquilateralTriangle, RightEquilateralTriangle, EquilateralTriangle} from "../shapes";
import {PointProcessor, DegradePointProcessor, RowRemover, ColumnRemover, RowMover} from "../glitch";

export class LinesExperiment extends Experiment {

  readonly BORDER: number = 4;
  patterns: Element[] = [];
  chance = new Chance();
  readonly DEGRADE: number = 50;
  processor: PointProcessor = new DegradePointProcessor(this.DEGRADE);
  frameCount = 0;
  readonly TOTAL_FRAMES = 40;

  constructor(canvas: Canvas) {
    super("lines", canvas, 40, "1x8"); 
  }

  primaryColor(): string {
    return Pico8Pallete.white;
  }

  secondaryColor(): string {
    return Pico8Pallete.darkGray;
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
    let colorPicker = new SingleColorPicker(this.primaryColor());
    let toggle = this.chance.bool({ likelihood: 100 });
  let pattern = new BarsPattern(size, origin, colorPicker, direction, toggle);
    this.patterns.push(pattern);
  }

  addBarPatterns() {
    this.addBarPattern(Direction.horizontal);
    //this.addBarPattern(Direction.vertical);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(this.secondaryColor());

    this.frameCount += 1;

    // add our first pattern
    if (this.patterns.length == 0) {
      this.addBarPatterns();
    }
 
    // render
    let randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
    var pattern = this.patterns[randomPatternIndex];

    pattern.tick();

    let ratio = Math.floor((this.frameCount / this.TOTAL_FRAMES) * 100); 
   
    // remove rows    
    let movePercent = this.chance.integer({ min: 0, max: 10 });
    this.processor = new RowMover(movePercent);

    let points = pattern.getPoints(); //this.processor.processPoints(pattern.getPoints());
    //points = new RowRemover(10).processPoints(points);

    // degrade 
    /*
    if (this.chance.bool({likelihood: 15})) {
      let degrade = ratio < 10 ? 0 : ratio;
      points = new DegradePointProcessor(degrade).processPoints(points);
    }*/
    
    //points = new ColumnRemover(5).processPoints(points);
    let s = 12;
    let hex = new Hexagon(s, frame.centerPoint());
    for (var point of points) {
      if (hex.containsPoint(point)) {
        frame.appendPixel(point.x, point.y, point.color);
      }
    } 
    return frame;
  }
}
 
