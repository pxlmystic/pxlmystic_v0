import {Direction, Size, Point, Element} from "./element";

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

