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
import {Shape, Rect, Circle, RightTriangle, LeftEquilateralTriangle, RightEquilateralTriangle, EquilateralTriangle} from "../shapes"

export class Patterns2Experiment extends Experiment {

  readonly BORDER: number = 4;
  patterns: Element[] = [];
  equilateralTriangles: EquilateralTriangle[] = [];
  chance = new Chance();

  constructor(canvas: Canvas) {
    super("patterns2", canvas, 20, "1x2"); 
  }

  primaryColor(): string {
    return Pico8Pallete.darkGray;
  }

  secondaryColor(): string {
    return Pico8Pallete.white;
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
    this.addBarPattern(Direction.vertical);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(this.secondaryColor());

    // add our first pattern
    if (this.patterns.length == 0) {
      this.addBarPatterns();
    }
 
    // equilateral triangles
    if (this.equilateralTriangles.length == 0) {
      let triangleTop = new EquilateralTriangle(
        { x: this.BORDER, 
          y: this.BORDER 
        }, 
        Math.floor(-1 * ((this.canvas.pixelGrid.y - (this.BORDER * 2)) - 0) / 2), 
        ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0)
      );

      let triangleRight = new RightEquilateralTriangle(
        { x: this.BORDER, 
          y: this.BORDER 
        }, 
        Math.floor(-1 * ((this.canvas.pixelGrid.y - (this.BORDER * 2)) - 0) / 2), 
        ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0)
      );

      let triangleBottom = new EquilateralTriangle(
        { x: this.BORDER, 
          y: this.canvas.pixelGrid.y - this.BORDER 
        }, 
        Math.floor((this.canvas.pixelGrid.y - (this.BORDER * 2)) / 2), 
        ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0)
      );

      let triangleLeft = new LeftEquilateralTriangle(
        { x: this.BORDER, 
          y: this.canvas.pixelGrid.y - this.BORDER 
        }, 
        Math.floor((this.canvas.pixelGrid.y - (this.BORDER * 2)) / 2), 
        ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0)
      );

      this.equilateralTriangles.push(triangleTop);
      this.equilateralTriangles.push(triangleBottom);
      this.equilateralTriangles.push(triangleLeft);
      this.equilateralTriangles.push(triangleRight);
    }

    // render
    for (var i = 0; i < this.equilateralTriangles.length; i++) {
      let randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
      var pattern = this.patterns[randomPatternIndex];

      let shape = this.equilateralTriangles[i];

      pattern.tick();
      let points = pattern.getPoints();
      for (var point of points) {
        if (shape.containsPoint(point)) {
          frame.appendPixel(point.x, point.y, point.color);
        }
      } 
    }

    return frame;
  }
}
 
