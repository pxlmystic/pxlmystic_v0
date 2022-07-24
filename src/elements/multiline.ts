import {Direction, Element, Point, Size} from "../element";
import {ColorPicker} from "../color-picker";

export class Multiline extends Element {
 
  lineSize: Size;
  origin: Point = {x: 0, y: 0};
  colorPicker: ColorPicker;
  lineWidth: number;
  direction: Direction;
  numLines: number;

  constructor(lineSize: Size, origin: Point, colorPicker: ColorPicker, numLines: number, direction: Direction) {
    super();
    this.lineSize = lineSize;
    this.origin = origin = origin ? origin : this.origin;
    this.colorPicker = colorPicker;
    this.numLines = numLines;
    this.direction = direction;
  }

  tick() {
    // noop for now
  }

  getPoints(): Point[] {
    let points: Point[] = [];
    let color = this.colorPicker.nextColor();
    for (var x = this.origin.x; x < this.origin.x + this.lineSize.width * this.numLines; x++) {
    let color = this.colorPicker.nextColor();
      for (var y = 0; y < this.lineSize.height; y++) {
        if (this.direction == Direction.horizontal) {
          points.push({ x: y, y: x, color: color });
        } else {
          points.push({ x: x, y: y, color: color });
        }
      }
    }
    return points;
  }
}

