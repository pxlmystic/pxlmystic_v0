import {ColorPicker} from "../color-picker";
import {Direction, Size, Point, Element} from "../element";

export class LoaderElement extends Element {
  origin: Point;
  colorPicker: ColorPicker;
  dots: number;
  onFrames: number;
  offFrames: number;
  persistDots: Boolean = false;
  spacing: number = 0;
  height: number = 1;
  direction: Direction;
  maxIterations: number = 420;

  // state
  ticks: number = 0;
  ticksOn: number = 0;
  ticksOff: number = 0;
  currentDot: number = 0;
  iterations: number = 0;

  constructor(origin: Point, colorPicker: ColorPicker, onFrames: number, offFrames: number, dots: number, persistDots?: Boolean, spacing?: number, height?: number, direction?: Direction, maxIterations?: number) {
    super(); 
    this.origin = origin;
    this.colorPicker = colorPicker;
    this.onFrames = onFrames;
    this.offFrames = offFrames;
    this.dots = dots;
    this.persistDots = persistDots == true;
    this.spacing = spacing != 0 ? spacing : 0;
    this.height = height != this.height ? height : this.height;
    this.direction = direction ? direction : Direction.horizontal;
    this.maxIterations = maxIterations ? maxIterations : this.maxIterations;
  }

  tick() {
    this.ticks += 1;
   
    if (this.isOn()) {
      this.ticksOn += 1;
    } else if (this.isOff()) {
      this.ticksOff += 1;
    }

    if (this.ticksOn > this.onFrames) { 
      this.currentDot += 1;
      this.ticksOn = 1;
    }

    if (this.isOn() && this.currentDot >= this.dots) {
      this.currentDot = 0; // reset
      this.ticksOn = 0;
      this.ticksOff = 1;
      this.iterations += 1;
    }

    if (this.isOff() && this.ticksOff > this.offFrames) {
      this.currentDot = 0;
      this.ticksOn = 1;
      this.ticksOff = 0;
    }
  }

  isOn(): Boolean {
    return this.ticks <= 1 || this.ticksOn > 0;
  }

  isOff(): Boolean {
    return this.ticksOff > 0;
  }

  expired(): Boolean {
    return this.iterations >= this.maxIterations;
  }

  skipToEndBeforeTick() {
    this.currentDot = this.dots - 1;
  }

  getPoints(): Point[] {
    if (this.expired() || this.isOff()) { return []; }

    let points: Point[] = [];
    let x = this.origin.x;
    if (!this.persistDots) {
      x += this.currentDot;
    }
    let i = 0;
    while (x < this.origin.x + this.currentDot + 1) {
      for (var y = 0; y < this.height; y++) {
        let point: Point = {
          x: x + this.spacing * i, 
          y: this.origin.y + y, 
          color: this.colorPicker.nextColor()
        };

        if (this.direction == Direction.vertical) {
          let vPoint: Point = { 
            x: point.y, 
            y: point.x,
            color: point.color 
          };
          points.push(vPoint);
        } else {
          points.push(point);
        }
      }
      x += 1;
      i += 1;
    }
    return points;
  }
}

