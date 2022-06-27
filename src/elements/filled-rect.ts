import {Direction, Element, Point, Size} from "../element";
import {ColorPicker} from "../color-picker";

export class FilledRect extends Element {
 
  size: Size;
  origin: Point = {x: 0, y: 0};
  colorPicker: ColorPicker;

  constructor(size: Size, origin: Point, colorPicker: ColorPicker) {
    super();
    this.size = size;
    this.origin = origin = origin ? origin : this.origin;
    this.colorPicker = colorPicker;
  }

  tick() {
    // noop for now
  }

  getPoints(): Point[] {
    let points: Point[] = [];
    for (var x = this.origin.x; x < this.size.width; x++) {
      for (var y = this.origin.y; y < this.size.height; y++) {
        let color = this.colorPicker.nextColor();
        let point: Point = {
          x: x,
          y: y,
          color: color
        };
        points.push(point);
      }
    }
    return points;
  }
}

