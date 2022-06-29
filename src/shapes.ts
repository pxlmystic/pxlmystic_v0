import {Direction, Size, Point, Element} from "./element";

export class Shape {
  containsPoint(point: Point): boolean {
    return false;
  }
}

export class Rect extends Shape {
  size: Size;
  origin: Point;

  constructor(size: Size, origin: Point) {
    super();
    this.size = size;
    this.origin = origin;
  }

  containsPoint(point: Point): boolean {
    return point.x >= this.origin.x && point.x <= this.origin.x + this.size.width &&
             point.y >= this.origin.y && point.y <= this.origin.y + this.size.height;
  }
}

export class Circle extends Shape {
  radius: number;
  center: Point;
 
  constructor(radius: number, center: Point) {
    super();
    this.radius = radius;
    this.center = center;
  }
 
  containsPoint(point: Point): boolean {
   return (this.center.x - point.x) * (this.center.x - point.x) + 
     (this.center.y - point.y) * (this.center.y - point.y) < this.radius * this.radius;
  }
}

export class RightTriangle extends Shape {
  origin: Point;
  adjacent: number;
  opposite: number;

  constructor(origin: Point, adjacent: number, opposite: number) {
    super();
    this.origin = origin;
    this.adjacent = adjacent;
    this.opposite = opposite;
  }

  pointA(): Point {
    return { x: this.origin.x, y: this.origin.y - this.adjacent };
  }

  pointB(): Point {
    return { x: this.origin.x + this.opposite, y: this.origin.y };
  }

  sign(p1: Point, p2: Point, p3: Point): number {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y); 
  }

  // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
  hitTest(pt: Point, v1: Point, v2: Point, v3: Point) {
    let d1, d2, d3;
    let hasNeg, hasPos;

    d1 = this.sign(pt, v1, v2);
    d2 = this.sign(pt, v2, v3);
    d3 = this.sign(pt, v3, v1);

    hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(hasNeg && hasPos);
  }

  // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
  containsPoint(point: Point): boolean {
    return this.hitTest(point, this.origin, this.pointA(), this.pointB());
  }
}

export class EquilateralTriangle extends RightTriangle {

  pointA(): Point {
    let x = this.origin.x + Math.floor(this.opposite / 2);
    return { x: x, y: super.pointA().y }
  }
}

// converts a bottom anchored triangle to left
export class LeftEquilateralTriangle extends EquilateralTriangle {
  
  pointB(): Point {
    return { x: this.origin.x, y: this.origin.y - this.opposite};
  }
}

// converts a top anchored triangle to right
export class RightEquilateralTriangle extends EquilateralTriangle {
  containsPoint(point: Point): boolean {
    let adjustedOrigin = {
      x: this.origin.x + this.opposite,
      y: this.origin.y + this.opposite
    }
    return this.hitTest(point, adjustedOrigin, this.pointA(), this.pointB());
  }
}

