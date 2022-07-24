import {Direction, Element, Point, Size} from "../element";
import {ColorPicker} from "../color-picker";

export class StripedSquare extends Element {
 
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

  pointsForSquare(origin, size, points: Point[]): Point[] {
    if (size.width <= 1 && size.height <= 1) {
      return points;
    }

    for (var x = origin.x; x < size.width; x++) {
      for (var y = origin.y; y < size.height; y++) {
        let draw: boolean = false;

        // top or bottom row
        if (y == origin.y || y == size.height - 1) {
          draw = true;
        }

        // sides
        if (!draw && x == origin.x || x == size.width - 1) {
          draw = true;
        }

        if (draw) {
          let point: Point = {
             x: x,
             y: y,
             color: this.colorPicker.nextColor()
           }
          points.push(point);
        }
      }
    }

    // zoom in
    let nextSize: Size = {
      width: size.width - 2,
      height: size.height - 2,
    }

    let nextOrigin: Point = {
      x: origin.x + 2,
      y: origin.y + 2
    }
   
    return this.pointsForSquare(nextOrigin, nextSize, points);
  }

  getPoints(): Point[] {
    return this.pointsForSquare(this.origin, this.size, []);
  }

  containsPoint(point: Point): boolean {
    for (var p of this.getPoints()) {
       if (p.x == point.x && p.y == point.y) { return true; }
    }
    return false; 
  }
}


