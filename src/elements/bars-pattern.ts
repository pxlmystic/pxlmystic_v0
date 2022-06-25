import {Direction, Element, Point, Size} from "../element";

export class BarsPattern extends Element {
 
  size: Size;
  origin: Point = {x: 0, y: 0};
  direction: Direction; 

  constructor(size: Size, origin: Point, direction: Direction) {
    super();
    this.size = size;
    this.origin = origin = origin ? origin : this.origin;
    this.direction = direction;
  }

  tick() {
    // noop for now
  }

  getPoints(): Point[] {
    let points: Point[] = [];
    for (var x = this.origin.x; x < this.size.width; x++) {
      for (var y = this.origin.y; y < this.size.height; y++) {
        let on: boolean = x % 2 == 1;
        if (on) {
          let point: Point = {
            x: x,
            y: y
          };
          if (this.direction == Direction.horizontal) {
            let hPoint: Point = {
              x: point.y,
              y: point.x
            }
            points.push(hPoint);
          } else {
            points.push(point);
          }
        }
      }
    }
    return points;
  }
}

