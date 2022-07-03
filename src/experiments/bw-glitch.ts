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

export class BWGlitchExperiment extends Experiment {

  readonly BORDER: number = 4;
  patterns: Element[] = [];
  chance = new Chance();
  readonly DEGRADE: number = 50;
  processor: PointProcessor = new DegradePointProcessor(this.DEGRADE);
  frameCount = 0;
  readonly TOTAL_FRAMES = 69;
  inverted = false;
  invertDuration = 0;
  invertCount = 0;

  constructor(canvas: Canvas) {
    super("bw-glitch", canvas, 69, "1x8"); 
  }

  primaryColor(): string {
    return !this.inverted ? Pico8Pallete.white : Pico8Pallete.darkGray;
  }

  secondaryColor(): string {
    return !this.inverted ? Pico8Pallete.darkGray : Pico8Pallete.white;
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

  invert() {
    if (this.inverted) {
      this.invertCount += 1;
    } else {
      this.inverted = this.chance.bool({ likelihood: 5 });
      if (!this.inverted) { return; }
      this.invertDuration = this.chance.integer({ min: 1, max: 6 });
      this.invertCount = 1;
      return;
    }

    if (this.invertCount > this.invertDuration) {
      this.inverted = false;
      this.invertCount = 0;
      return;
    }   
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    this.invert();
    frame.appendBG(this.secondaryColor());
    if (this.chance.bool({ likelihood: 2 })) { return frame; }

    this.frameCount += 1;

    this.patterns = [];
    // add our first pattern
    if (this.patterns.length == 0) {
      //this.addBarPatterns();
      let fillColor = !this.inverted ? Pico8Pallete.white : Pico8Pallete.darkGray;
      this.addFilledRect(fillColor);
    }
 
    // render
    let randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
    var pattern = this.patterns[randomPatternIndex];

    pattern.tick();

    let ratio = Math.floor((this.frameCount / this.TOTAL_FRAMES) * 100); 
   
    let processPercent = .069;
    this.processor = new DegradePointProcessor(processPercent);

    let points = this.processor.processPoints(pattern.getPoints());

    if (this.chance.bool({ likelihood: 50 })) {
      points = new RowRemover(.5, .5).processPoints(points);
    } else {
      points = new ColumnRemover(.5, .5).processPoints(points);
    }

    //if (this.chance.bool({ likelihood: 5 })) { return frame; }
    for (var point of points) {
      frame.appendPixel(point.x, point.y, point.color);
    } 
    return frame;
  }
}
 
