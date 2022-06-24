import {Size, Point, Element} from "../element";

export class BlinkerElement extends Element {
  size: Size;
  origin: Point;
  ticks: number = 0;
  ticksOn: number = 0;
  ticksOff: number = 0;
  onFrames: number;
  offFrames: number;
  color: string;
 
  constructor(size: Size, origin: Point, color: string, onFrames: number, offFrames: number) {
    super();
    this.size = size;
    this.origin = origin;
    this.color = color;
    this.onFrames = onFrames;
    this.offFrames = offFrames;
  }

  tick() {
    this.ticks += 1;

    // start with on state
    if (this.ticksOn == 0 && this.ticksOff == 0) {
      this.ticksOn += 1;
      return;
    }

    if (this.isOn()) {
      this.ticksOn += 1;
    } else if (this.isOff()) {
      this.ticksOff += 1;
    }

    // switch off
    if (this.ticksOn > this.onFrames) {
      this.ticksOn = 0;
      this.ticksOff = 1;
      return;
    }

    // switch on
    if (this.ticksOff > this.offFrames) {
      this.ticksOff = 0;
      this.ticksOn = 1;
      return;
    }
  }

  isOn(): Boolean {
    return this.ticksOn > 0; 
  }

  isOff(): Boolean {
    return this.ticksOff > 0;
  }

  getPoints(): Point[] {
    if (this.isOff()) { return []; }
   
    let points: Point[] = []; 
    for (var x = this.origin.x; x < this.origin.x + this.size.width; x++) {
      for (var y = this.origin.y; y < this.origin.y + this.size.height; y++) {
        let point: Point = {x: x, y: y, color: this.color}; 
        points.push(point);
      }
    }
    return points;
  }
}

